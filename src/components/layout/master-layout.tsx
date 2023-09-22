import React from 'react'

import "../../styles/base.scss"
import * as styles from "./master-layout.module.scss"

type MasterLayoutProps = {
    children: React.ReactNode
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    return (
        <div className={styles.masterLayout}>
            {children}
        </div>
    )
}

export default MasterLayout