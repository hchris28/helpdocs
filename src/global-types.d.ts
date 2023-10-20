
interface User {
    name: string;
    email: string;
    company: Company
    Anonymous?: boolean;
}

interface Company {
    name: string;
    key: string;
}

interface DocumentMdx {
    fields: { slug: string; company: string; }
    frontmatter: { title: string; order: number; }
    internal: { contentFilePath: string; }
    tableOfContents: { items: TableOfContentsItem[]; };
    breadcrumbs: BreadcrumbItem[];
}

interface DocumentTreeItem {
    title: string;
    slug: string;
    children: DocumentTreeItem[];
};

interface BreadcrumbItem {
    title: string;
    slug: string;
}

interface TableOfContentsItem {
    url: string;
    title: string;
    items: TableOfContentsItem[];
}

interface SiteMetaData {
    site: {
        siteMetadata: {
            title?: string
            siteUrl?: string
            helpLink?: string
        }
    }
}

interface SearchIndexItem {
    id: string;
    title: string;
    body: string;
    slug: string;
    company: string;
    breadcrumbs: BreadcrumbItem[];
    excerpt?: string;
}