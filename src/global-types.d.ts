
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