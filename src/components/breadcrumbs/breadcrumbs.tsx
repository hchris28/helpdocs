import React from 'react'
import { Link } from 'gatsby'
import * as styles from './breadcrumbs.module.scss'

type BreadcrumbProps = {
    items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {

    if (!items || items.length === 0) {
        return null
    }

    return (
        <div className={styles.container}>
            {items.map((item, index) => {
                return (
                    <span className={styles.breadcrumb} key={index}>
                        <Link to={`/${item.slug}`}>{item.title}</Link>
                    </span>
                )
            })}
        </div>
    )
}

export default Breadcrumbs