import React from 'react';
import styles from './styles.module.css';
import Button from '../../../Button';

function ActionsPanel({ planId }: { planId: string }) {
    return (
        <div className={styles.panelWrapper}>
            <Button text='' className={styles.favoriteBtn} />
            <Button text='PARTICIPATE' className={styles.participateBtn} />
        </div>
    );
}

export default ActionsPanel;
