import React from 'react';
import * as styles from './table-of-contents.module.scss'

interface TableOfContentsProps {
    items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items })  => {
    if (!items)
        return null;

    return (
        <nav className={styles.container}>
            Jump to:
            <ul className={styles.tocContainer}>
                {items.map(item => (
                    <li className={styles.tocItem} key={item.url}>
                        <a href={`${item.url}`}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
