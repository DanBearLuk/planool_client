import React from 'react';
import styles from './styles.module.css';

function PlansList({ title, plans, includeCreate = false } : { title: string, plans: any[], includeCreate?: boolean }) {
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

                {includeCreate && (
                    <div className={styles.planWrapper}>
                        <img src='/general/plus.svg' style={{ padding: '30px' }} />
                        <h4>Create new Event</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlansList;
