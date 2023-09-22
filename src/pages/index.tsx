import React from "react"
import type { PageProps } from "gatsby"
import LogInForm from "../components/log-in-form/log-in-form"
import * as styles from "./index.module.scss"

const IndexPage: React.FC<PageProps> = () => {

    return (
        <main className={styles.main}>
            <h1>Help Docs</h1>
            <LogInForm />
        </main>
    )
}

export default IndexPage

export { Head } from "../components/head/head"
