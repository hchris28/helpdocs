
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