import * as React from "react"
import { Link } from "gatsby"
import { useLocation } from '@reach/router';
import * as styles from "./document-tree.module.scss"

type DocumentTreeProps = {
    data: DocumentTreeItem[]
}

const DocumentTreeItem = ({ slug, title, children }: DocumentTreeItem): JSX.Element => {
    const location = useLocation();
    const isActive = location.pathname === `/${slug}/`;
    const className = isActive ? styles.activeDocumentLink : styles.documentLink;
    
    return (
        <li key={slug}>
            <Link to={`/${slug}`} className={className}>{title}</Link>
            {children.length > 0 && (
                <ul>
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