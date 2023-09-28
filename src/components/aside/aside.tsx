import React, { PropsWithChildren } from "react"
import InfoIcon from "../icons/info-icon"
import WarningIcon from "../icons/warning-icon"
import * as styles from "./aside.module.scss"

type AsideProps = {
    type: "info" | "warning"
}

const Aside = ({ children, type = 'info' }: PropsWithChildren<AsideProps>): JSX.Element => {

    const icon = type === "info" ? <InfoIcon /> : <WarningIcon />;
    const asideContainerClass = type === "info" ? styles.infoContainer : styles.warningContainer;

    return (
        <div className={asideContainerClass}>
            <div className={styles.iconContainer}>
                {icon}
            </div>
            <div className={styles.textContainer}>
                {children}
            </div>
        </div>
    )
}

export default Aside