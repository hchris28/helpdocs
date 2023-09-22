import React from 'react'
import type { PageProps } from "gatsby"
import DocumentTree from '../../components/document-tree/document-tree'
import Document from '../../components/document/document'
import MasterLayout from '../../components/layout/master-layout'
import SearchBar from '../../components/search-bar/search-bar'
import * as styles from "./index-page.module.scss"

type IndexPageProps = {
    children: React.ReactNode
}

type IndexPageContext = {
    company: string
    slug: string
    documentTree: DocumentTreeItem[]
}

const IndexPage: React.FC<PageProps<IndexPageProps, IndexPageContext>> = ({
    pageContext: { documentTree },
    children
}) => {

    return (
        <MasterLayout>
            <div>
                <SearchBar />
            </div>
            <div className={styles.documentExplorer}>
                <div className={styles.documentTreeContainer}>
                    <DocumentTree data={documentTree} />
                </div>
                <div className={styles.documentContainer}>
                    <Document>{children}</Document>
                </div>
            </div>
        </MasterLayout>
    )
}

export default IndexPage

export { Head } from "../../components/head/head"