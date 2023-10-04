import React, { PropsWithChildren, useEffect, useState } from "react";
import * as styles from "./loading-boundary.module.scss";

type LoadingBoundaryProps = {
    isLoading: boolean;
    message?: string;
    delay?: number;
}

const LoadingBoundary = ({ children, isLoading, message = 'Loading', delay = 250 }: PropsWithChildren<LoadingBoundaryProps>): JSX.Element => {

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading)
                setShowSpinner(true);
        }, delay);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        return <>{children}</>;
    }

    return showSpinner
        ? (
            <div className={styles.container}>
                <div className={styles.spinner}></div>
                {message}
            </div>
        ) : <></>;
};

export default LoadingBoundary;