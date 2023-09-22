import React from "react"
import { navigate } from "gatsby"
import { useLocalStorage } from 'usehooks-ts'
import ExitIcon from "../icons/exit-icon"
import * as styles from "./log-out-button.module.scss"

const LogOutButton = (): JSX.Element => {

    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);

    const handleClick = () => {
        setUser(undefined);
        navigate('/');
    }

    return (
        <button className={styles.button}>
            <ExitIcon onClick={handleClick} />
        </button>
    )
}

export default LogOutButton