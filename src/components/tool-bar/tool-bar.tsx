import React from "react"
import { useReadLocalStorage } from 'usehooks-ts'
import LogOutButton from '../../components/log-out-button/log-out-button'
import * as styles from "./tool-bar.module.scss"

const ToolBar = (): JSX.Element => {

    const user = useReadLocalStorage<User | undefined>('user');

    return (
        <div className={styles.container}>
            <div className={styles.userName}>Hi {user?.name}</div>
            <LogOutButton />
        </div>
    )
}

export default ToolBar