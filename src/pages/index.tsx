import React, { useState, useEffect } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import { useLocalStorage } from 'usehooks-ts'

const IndexPage: React.FC<PageProps> = () => {

    // TODO: Company validation

    const [company, setCompany] = useLocalStorage('company', '')
    const [input, setInput] = useState('')

    useEffect(() => {
        if (company) {
            console.log('Company is set')
        }
    }, [company])

    return (
        <main>
            <h1>Help Docs</h1>
            {company ? (
                <>
                    <p>Company: {company}</p>
                    <button onClick={() => setCompany('')}>Log out</button>
                    <Link to={`/${company}`}>View the Docs</Link>
                </>
            ) : (
                <>
                    <p>Please enter the docs you wish to view...</p>
                    <input type="text" onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => setCompany(input)}>Set Company</button>
                </>
            )}
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Help Docs</title>
