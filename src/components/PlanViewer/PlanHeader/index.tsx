import React from 'react';
import { AuthorInfo, PlanInfo } from '../types';
import Header from '../../Header';
import styles from './styles.module.css';
import AuthorInfoPanel from './AuthorInfoPanel';
import ActionsPanel from './ActionsPanel';

interface PlanHeader {
    authorInfo: AuthorInfo,
    planInfo: PlanInfo
}

function PlanHeader({ authorInfo, planInfo } : PlanHeader) {
    return (
        <Header
            leftBlock={<AuthorInfoPanel id={authorInfo.id} username={authorInfo.username} />}
            centerBlock={<h1 className={styles.planTitle}>{planInfo.title}</h1>}
            rightBlock={<ActionsPanel planId={planInfo.id} />}
            style={{ background: 'var(--secondary-gray)' }}
        />
    )
}

export default PlanHeader;
