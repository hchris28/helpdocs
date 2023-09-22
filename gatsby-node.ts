import { GatsbyNode } from "gatsby"

import path from 'path';

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
    node,
    getNode,
    actions,
}) => {
    const { createNodeField } = actions

    if (node.internal.type === 'Mdx') {
        const contentFilePath: string = node.internal.contentFilePath ?? "";
        const pathArray = path.dirname(contentFilePath).split('/');
        const documentIndex = pathArray.indexOf('documents');

        const companyKey = pathArray[documentIndex + 1];
        const slug = pathArray.slice(documentIndex + 1).join('/') + '/' + path.basename(contentFilePath, '.mdx');

        createNodeField({
            node,
            name: 'company',
            value: companyKey
        });

        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
}

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;
    const indexPageTemplate = path.resolve('./src/templates/index-page/index-page.tsx');

    const documentList: {
        errors?: any;
        data?: {
            allMdx: {
                group: Array<{
                    fieldValue: string;
                    nodes: Array<DocumentMdx>
                }>
            }
        }
    } = await graphql(`
        query GetDocumentList {
            allMdx {
                group(field: {fields: {company: SELECT}}) {
                    fieldValue
                    nodes {
                        fields {
                            company
                            slug
                        }
                        frontmatter {
                            title
                            order
                        }
                        internal {
                            contentFilePath
                        }
                    }
                }
            }
        }
    `);

    // We will create the document tree here along side the pages. This allows us to use
    // the same query to build the document tree and create the pages. This means we only need
    // to create the document tree once per build instead of once per page. The document tree will
    // be passed to the page context and used by the page to render the menu.

    const documentTree: Map<string, DocumentTreeItem[]> = new Map();
    const companyGroups = documentList.data?.allMdx.group;
    if (!companyGroups) {
        throw new Error('No documents found.');
    }

    const orderComparator = (a: any, b: any) => a.frontmatter.order - b.frontmatter.order;

    enum DocDescendantType {
        None,
        Index,
        Document,
        SubtopicIndex,
        Distant,
    };

    function getDocDescendantType(topic: string[], doc: any) {
        if (!doc.fields.slug.startsWith(topic.join('/')))
            return DocDescendantType.None;

        const topicLevel = topic.length;
        const docTopicArray = doc.fields.slug.split('/');
        const basename = docTopicArray.pop();
        const docLevel = docTopicArray.length;
        
        if (docLevel === topicLevel) {
            return basename === 'index'
                ? DocDescendantType.Index
                : DocDescendantType.Document;
        }

        if (docLevel === topicLevel + 1 && basename === 'index') {
            return DocDescendantType.SubtopicIndex;
        }

        return DocDescendantType.Distant;
    };

    companyGroups?.forEach((companyGroup) => {
        const companyDocTree = documentTree.set(companyGroup.fieldValue, []).get(companyGroup.fieldValue);
        if (!companyDocTree) {
            throw new Error(`Company ${companyGroup.fieldValue} not found in menu.`);
        }

        const allDocs = companyGroup.nodes;

        function createDocumentTreeItem(topic: string[], title: string, slug: string): DocumentTreeItem {
            
            const children: DocumentTreeItem[] = [];
            const topicDocs = allDocs
                .filter((doc) => doc.fields.slug !== slug && doc.fields.slug.startsWith(topic.join('/')))
                .sort(orderComparator);
            topicDocs?.forEach((topicDoc) => {
                const descendantType = getDocDescendantType(topic, topicDoc);
                
                switch (descendantType) {
                    case DocDescendantType.Document:
                        children.push({title: topicDoc.frontmatter.title, slug: topicDoc.fields.slug, children: []});
                        break;
                    case DocDescendantType.SubtopicIndex:
                        const { frontmatter: { title }, fields: { slug } } = topicDoc;
                        const subtopic = slug.split('/').slice(0, -1);
                        children.push(createDocumentTreeItem(subtopic, title, slug));
                        break;
                    case DocDescendantType.Index:
                        // nothing  to do, index will be handled by their root document
                        break;
                    case DocDescendantType.Distant:
                        // nothing to do,  distant descendants will be handled by their direct parent
                        break;
                };
            });
            
            return { title, slug, children };
        };

        // Loop through all root documents and add them to the menu.
        const rootDocs = allDocs
            .filter((doc) => {
                const slugArray = doc.fields.slug.split('/');
                return slugArray.length === 3 && slugArray[2] === 'index';
            })
            .sort(orderComparator);
        if (!rootDocs.length) {
            throw new Error(`No root documents found for company ${companyGroup.fieldValue}.`);
        }

        rootDocs.forEach((rootDoc) => {
            const { frontmatter: { title }, fields: { slug } } = rootDoc;
            const topic: string[] = slug.split('/').slice(0, -1);
            const rootDocumentTreeItem = createDocumentTreeItem(topic, title, slug);
            companyDocTree.push(rootDocumentTreeItem)
        });
    });

    // Create the pages
    companyGroups.forEach((companyGroup) => {

        const company: string = companyGroup.fieldValue;
        const companyDocs: Array<DocumentMdx> = companyGroup.nodes;
        const companyIndex = companyDocs
            .filter((doc) => {
                const slugArray = doc.fields.slug.split('/');
                return slugArray.length === 3 && slugArray[2] === 'index';
            })
            .sort(orderComparator)[0];

        createPage({
            component: `${indexPageTemplate}?__contentFilePath=${companyIndex.internal.contentFilePath}`,
            path: `/${company}`,
            context: {
                company: company,
                slug: companyIndex.fields.slug,
                documentTree: documentTree.get(company)
            }
        })

        companyDocs.forEach((doc) => {
            const { fields: { slug, company }, internal: { contentFilePath } } = doc;
            createPage({
                component: `${indexPageTemplate}?__contentFilePath=${contentFilePath}`,
                path: slug,
                context: {
                    company: company,
                    slug: slug,
                    documentTree: documentTree.get(company)
                }
            })
        });
    });
}