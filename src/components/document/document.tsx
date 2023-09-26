import React, { PropsWithChildren } from "react"

const Document = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Document