import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: `Help Docs`,
        siteUrl: `https://help.xeelee.org`,
        helpLink: `mailto:chris@xeelee.org?subject=Gently%20Hugged%20web%20site%20help`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            icon: false,
                        },
                    },
                ],
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        `gatsby-transformer-json`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": `${__dirname}/static/images/`,
            },
            __key: "images"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": `${__dirname}/src/pages/`
            },
            __key: "pages"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "documents",
                "path": "./src/documents/"
            },
            __key: "documents"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "data",
                "path": "./src/data/"
            },
            __key: "data"
        },
        {
            resolve: `gatsby-plugin-fusejs`,
            options: {
                query: `
                    query SearchIndex {
                        allMdx {
                            nodes {
                                id,
                                frontmatter {
                                    title
                                }
                                fields {
                                    slug
                                    company
                                }
                                breadcrumbs
                                excerpt
                                body
                            }
                        }
                    }`,
                keys: ['title', 'body', 'company'],
                normalizer: ({ data }: SearchSourceQueryResult): SearchIndexItem[] => {
                    // should we clean up the body text here? remove html tags? remove inisignificant words?
                    return data.allMdx.nodes.map((node) => ({
                        id: node.id,
                        title: node.frontmatter.title,
                        body: node.body,
                        slug: node.fields.slug,
                        company: node.fields.company,
                        breadcrumbs: node.breadcrumbs,
                        excerpt: node.excerpt,
                    }))
                },
            },
        },
    ]
};

interface SearchSourceItem {
    id: string;
    frontmatter: { title: string; };
    fields: { slug: string; company: string; };
    breadcrumbs: BreadcrumbItem[];
    excerpt: string;
    body: string;
}

interface SearchSourceQueryResult {
    data: {
        allMdx: {
            nodes: SearchSourceItem[];
        }
    }
}

export default config;
