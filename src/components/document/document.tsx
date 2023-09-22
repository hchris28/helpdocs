import React, { PropsWithChildren } from "react"

const Document = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <>
            {children}
        </>
    )
}

export default Document