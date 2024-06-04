import React from 'react';
import styles from './styles.module.css';

interface ErrorPageProps {
    errorCode: number,
    description?: string
}

function ErrorPage({ errorCode, description }: ErrorPageProps) {
    return (
        <div className={styles.errorWrapper}>
            <h1>{errorCode}</h1>
            <p>{description}</p>
        </div>
    );
}

export default ErrorPage;
