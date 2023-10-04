import React, { PropsWithChildren } from "react"
import { MDXProvider } from "@mdx-js/react"
import Aside from "../aside/aside";
import ShowMe from "../show-me/show-me";

const shortcodes = {
    Aside,
    ShowMe,
};

const Document = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <MDXProvider components={shortcodes}>
            {children}
        </MDXProvider>
    )
}

export default Document