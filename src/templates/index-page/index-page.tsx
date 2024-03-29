import React, { useEffect, useState } from 'react'
import type { PageProps } from "gatsby"
import { useReadLocalStorage } from 'usehooks-ts'
import { navigate } from 'gatsby'
import TableOfContents from '../../components/table-of-contents/table-of-contents'
import DocumentTree from '../../components/document-tree/document-tree'
import Document from '../../components/document/document'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'
import MasterLayout from '../../components/layout/master-layout'
import ToolBar from '../../components/tool-bar/tool-bar'
import LoadingBoundary from '../../components/loading-boundary/loading-boundary'
import * as styles from "./index-page.module.scss"

type IndexPageProps = {
    children: React.ReactNode
}

type IndexPageContext = {
    company: string
    slug: string
    title: string
    documentTree: DocumentTreeItem[]
    breadcrumbs: BreadcrumbItem[]
    tableOfContents: TableOfContentsItem[]
}

const IndexPage: React.FC<PageProps<IndexPageProps, IndexPageContext>> = ({
    pageContext: { documentTree, breadcrumbs, title, tableOfContents, company },
    children
}) => {

    const user = useReadLocalStorage<User | undefined>("user");
    const [waitingForUserData, setWaitingForUserData] = useState(true);

    useEffect(() => {
        if (user != null) {
            if (user.Anonymous) {
                navigate("/");
            } else if (user.company.key !== company) {
                navigate("/not-authorized");
            } else {
                setWaitingForUserData(false);
            }
        }
    }, [user]);
    
    return (
        <MasterLayout>
            <LoadingBoundary isLoading={waitingForUserData}>
                <ToolBar title={user?.company.name ?? "Help Docs"} />
                <div className={styles.documentExplorer}>
                    <div className={styles.documentTreeContainer}>
                        <DocumentTree data={documentTree} />
                    </div>
                    <div className={styles.documentContainer}>
                        <Breadcrumbs items={breadcrumbs} />
                        <Document>
                            <h1>{title}</h1>
                            <TableOfContents items={tableOfContents} />
                            {children}
                        </Document>
                    </div>
                </div>
            </LoadingBoundary>
        </MasterLayout>
    )
}

export default IndexPage

export { Head } from "../../components/head/head"