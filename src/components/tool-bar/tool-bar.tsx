import React from "react"
import { useReadLocalStorage } from 'usehooks-ts'
import SearchBar from '../../components/search-bar/search-bar'
import GetHelpButton from "../get-help-button/get-help-button"
import LogOutButton from '../../components/log-out-button/log-out-button'
import * as styles from "./tool-bar.module.scss"

type ToolBarProps = {
    title: string
}

const ToolBar = ({ title }: ToolBarProps): JSX.Element => {

    const user = useReadLocalStorage<User | undefined>('user');

    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.userName}>Hi {user?.name}</div>
            <SearchBar />
            <GetHelpButton />
            <LogOutButton />
        </div>
    )
}

export default ToolBar