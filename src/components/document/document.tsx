import React, { PropsWithChildren } from "react"
import { MDXProvider } from "@mdx-js/react"
import Aside from "../aside/aside";

const shortcodes = {
    Aside,
};

const Document = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <MDXProvider components={shortcodes}>
            {children}
        </MDXProvider>
    )
}

export default Document