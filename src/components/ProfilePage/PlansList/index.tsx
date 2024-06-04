import React from 'react';
import styles from './styles.module.css';

function PlansList({ title, plans } : { title: string, plans: any[] }) {
    return (
        <div className={styles.listWrapper}>
            <button>{title}</button>

            <div className={styles.list}>
                {plans.map((plan, idx) => (
                    <div className={styles.planWrapper} key={idx}>
                        <img src='https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.webp' />
                        <h4>{plan.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlansList;
