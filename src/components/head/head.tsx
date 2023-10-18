import React from 'react'
import type { HeadFC } from "gatsby"
import { useReadLocalStorage } from 'usehooks-ts'

type HeadContext = {
    company: string
}

export const Head: HeadFC<null, HeadContext> = ({ pageContext: { company } }) => {

    const user = useReadLocalStorage<User | undefined>('user');

    return (
        <>
            <html lang="en" />
            <title>{user?.company.name} Help Docs</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </>
    )
}