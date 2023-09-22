import React from 'react'
import type { HeadFC, PageProps } from "gatsby"

type HeadContext = {
    company: string
}

export const Head: HeadFC<null, HeadContext> = ({ pageContext: { company } }) => {
    return (
        <>
            <html lang="en" />
            <title>{company} Help Docs</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
        </>
    )
}