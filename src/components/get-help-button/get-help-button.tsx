import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import EmailIcon from "../icons/email-icon"
import * as styles from "./get-help-button.module.scss"

const GetHelpButton = (): JSX.Element => {

    const data: SiteMetaData = useStaticQuery(graphql`
        query siteMetaDataQuery {
            site {
                siteMetadata {
                    helpLink
                }
            }
        }
    `)

    return (
        <a href={data.site.siteMetadata.helpLink} className={styles.button}>
            <EmailIcon /> 
            <span className={styles.buttonText}>Get Help</span>
        </a>
    )
}

export default GetHelpButton