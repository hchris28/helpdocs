import React from 'react';
import * as styles from './table-of-contents.module.scss'

interface TableOfContentsProps {
    items: TableOfContentsItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items })  => {
    if (!items || items.length < 2)
        return null;

    return (
        <nav className={styles.container}>
            <span className={styles.tocLabel}>Jump to:</span>
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
