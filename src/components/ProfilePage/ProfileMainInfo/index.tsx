import React from 'react';
import styles from './styles.module.css';

function ProfileMainInfo({ avatarUrl, username }: { avatarUrl: string, username: string }) {
    return (
        <div className={styles.mainInfoWrapper}>
            <img src='/general/defaultAvatar.png' />
            <h2>{username}</h2>
        </div>
    );
}

export default ProfileMainInfo;
