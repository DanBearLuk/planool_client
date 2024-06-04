import React, { SyntheticEvent } from 'react';
import styles from './styles.module.css';
import { ADDRESSES } from '../../config';

interface MiniProfilePictureProps {
    userId: number,
    hasOutline?: boolean,
    dynamic?: boolean,
    style?: React.CSSProperties
}

function MiniProfilePicture({ 
    userId, 
    hasOutline = false, 
    dynamic = false, 
    style = {}
}: MiniProfilePictureProps) {
    const outlineClass = hasOutline ? styles.outline : '';
    const dynamicClass = dynamic ? `growOnHover ${styles.dynamic}` : '';

    const setDefaultAvatar = (e: SyntheticEvent<HTMLImageElement>) => {
        if (e.currentTarget.src !== '/general/defaultAvatar.png') {
            e.currentTarget.src = '/general/defaultAvatar.png';
        }
    };

    return (
        <img 
            className={`${styles.profilePicture} ${dynamicClass} ${outlineClass}`} 
            src={ADDRESSES.PUBLIC_FILES + userId || '/general/defaultAvatar.png'} 
            onError={setDefaultAvatar} 
            style={style}
            alt='mini avatar' 
        />
    );
}

export default MiniProfilePicture;
