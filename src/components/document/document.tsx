import React, { PropsWithChildren } from "react"
import { MDXProvider } from "@mdx-js/react"
import Aside from "../aside/aside";
import ShowMe from "../show-me/show-me";
import GetHelpButton from "../get-help-button/get-help-button";

const shortcodes = {
    Aside,
    ShowMe,
    GetHelpButton,
};

const Document = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <MDXProvider components={shortcodes}>
            {children}
        </MDXProvider>
    )
}

export default Document