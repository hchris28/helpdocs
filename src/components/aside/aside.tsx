import React, { PropsWithChildren } from "react"
import * as styles from "./aside.module.scss"

const Aside = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <div className={styles.asideContainer}>
            {children}
        </div>
    )
}

export default Aside