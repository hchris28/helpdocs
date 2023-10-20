import React, { useEffect, useState } from "react"
import type { PageProps } from "gatsby"
import { navigate}  from "gatsby"
import { useReadLocalStorage } from "usehooks-ts"
import LogInForm from "../components/log-in-form/log-in-form"
import LoadingBoundary from "../components/loading-boundary/loading-boundary"
import * as styles from "./index.module.scss"

const IndexPage: React.FC<PageProps> = () => {

    const user = useReadLocalStorage<User | undefined>("user");
    const [waitingForUserData, setWaitingForUserData] = useState(true);

    useEffect(() => {
        if (user != null && !user.Anonymous) {
            navigate(`/${user?.company.key}/`);
        } else {
            setWaitingForUserData(false);
        }
    }, [user]);

    return (
        <main className={styles.main}>
            <LoadingBoundary isLoading={waitingForUserData}>
                <h1>Help Docs</h1>
                <LogInForm />
            </LoadingBoundary>
        </main>
    )
}

export default IndexPage

export { Head } from "../components/head/head"
