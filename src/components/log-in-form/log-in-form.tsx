import React, { useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import * as styles from './log-in-form.module.scss'

type CompanyDTO = {
    key: string
    name: string
}

type UserDTO = {
    name: string
    email: string
}

type CompanyUsersDTO = {
    company: CompanyDTO
    users: UserDTO[]
}

type UsersQueryResult = {
    allUsersJson: {
        nodes: CompanyUsersDTO[]
    }
}

const LogInForm = (): JSX.Element => {

    const data: UsersQueryResult = useStaticQuery(graphql`
        query UsersQuery {
            allUsersJson {
                nodes {
                    company {
                        key
                        name
                    }
                    users {
                        name
                        email
                    }
                }
            }
        }
    `)

    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);
    const [error, setError] = useState('');
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const companyUsers: CompanyUsersDTO = data.allUsersJson.nodes.find((node: CompanyUsersDTO) => node.users.find((user: UserDTO) => user.email === input)) as CompanyUsersDTO;
        if (!companyUsers) {
            setError('User not found');
            return;
        }

        // This is guaranteed to be defined because we just checked for it above
        const user = companyUsers.users.find((user: UserDTO) => user.email === input) as UserDTO;

        setUser({
            name: user.name,
            email: user.email,
            company: companyUsers.company
        });
        navigate(`/${companyUsers.company.key}/`);
    }

    useEffect(() => {
        if (user) {
            navigate(`/${user.company.key}/`);
        }
    }, [user]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <p>Please enter your email address.</p>
            <input className={styles.emailInput} type="text" onChange={(e) => setInput(e.target.value)} />
            <button className={styles.submitButton}>Go to my docs</button>
        </form>
    )
}

export default LogInForm