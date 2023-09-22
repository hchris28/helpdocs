import React from "react"
import LogOutButton from '../../components/log-out-button/log-out-button'
import * as styles from "./tool-bar.module.scss"

const ToolBar = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <LogOutButton />
        </div>
    )
}

export default ToolBar