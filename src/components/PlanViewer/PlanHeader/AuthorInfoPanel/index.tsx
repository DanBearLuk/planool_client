import React from 'react';
import MiniProfilePicture from '../../../MiniProfilePicture';
import { AuthorInfo } from '../../types';
import styles from './styles.module.css';

function AuthorInfoPanel({ id, username}: AuthorInfo) {
    return (
        <div className={`${styles.panelWrapper} growOnHover`}>
            <MiniProfilePicture userId={id} style={{ background: '#FFF' }} />
            <h1>{username}</h1>
        </div>
    )
}

export default AuthorInfoPanel;
