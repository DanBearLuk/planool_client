import React from 'react';
import styles from './styles.module.css';

function AdditionalProfileInfo({ text }: { text: string }) {
    return (
        <div className={styles.additionalInfoWrapper}>
            <h3>Information</h3>
            <p>{text}</p>
        </div>
    );
}

export default AdditionalProfileInfo;
