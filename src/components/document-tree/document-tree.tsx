import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from '@reach/router';
import * as styles from "./document-tree.module.scss"

type DocumentTreeProps = {
    data: DocumentTreeItem[]
}

function normalizePath(path: string): string {
    // remove leading and trailing slashes
    return path.replace(/^\/|\/$/g, '');
}

function getFolderName(path: string): string {
    // remove the page name from the path
    return path.substring(0, path.lastIndexOf('/'));
}

const DocumentTreeItem = ({ slug, title, children }: DocumentTreeItem): JSX.Element => {
    const location = useLocation();
    const nrmlLocation = normalizePath(location.pathname);
    const nrmlSlug = normalizePath(slug);

    const isFolder = children.length > 0;
    const isOpen = isFolder && (
        // nrmlSlug.startsWith(getFolderName(nrmlLocation)) ||
        nrmlLocation.startsWith(getFolderName(nrmlSlug))
    );
    const isActive = nrmlLocation === nrmlSlug;
    
    const linkClassName = isActive ? styles.activeDocumentLink : styles.documentLink;
    const folderClassName = isOpen ? styles.openFolder : styles.closedFolder;
    
    return (
        <li key={slug}>
            <Link to={`/${slug}`} className={linkClassName}>{title}</Link>
            {isFolder && (
                <ul className={folderClassName}>
                    {children.map(DocumentTreeItem)}
                </ul>
            )}
        </li>
    )
}

const DocumentTree = ({ data }: DocumentTreeProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <ul>
                {data.map(DocumentTreeItem)}
            </ul>
        </div>
    )
}

export default DocumentTree