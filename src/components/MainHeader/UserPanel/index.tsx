import React, { SyntheticEvent } from 'react';
import { useUser } from '../../../contexts/UserContext';
import styles from './styles.module.css';
import MiniProfilePicture from '../../MiniProfilePicture';

function UserPanel() {
    const { user } = useUser();

    if (user !== null) {
        return (
            <div className={styles.userPanelWrapper}>
                <button className={styles.chats}></button>
                <button className={styles.notifications}></button>
                <MiniProfilePicture userId={user.id} dynamic hasOutline />
            </div>
        );
    } else {
        return (<></>)
    }
}

export default UserPanel;
