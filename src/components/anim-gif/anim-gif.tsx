import React, { useState, PropsWithChildren } from 'react'
import * as styles from './anim-gif.module.scss'

type AnimGifProps = {
    path: string
}

const AnimGif = ({ children, path }: PropsWithChildren<AnimGifProps>): JSX.Element => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        document.body.style.overflow = "hidden";
        setIsPopupVisible(true);
    }

    const hidePopup = () => {
        document.body.style.overflow = "auto";
        setIsPopupVisible(false);
    }

    return (
        <div>
            <button className={styles.button} onClick={showPopup}>Show Me!</button>
            {isPopupVisible &&
                <div className={styles.popup} onClick={hidePopup}>
                    <img src={`${path}?${new Date().getTime()}`} />
                </div>}
        </div>
    )
}

export default AnimGif;