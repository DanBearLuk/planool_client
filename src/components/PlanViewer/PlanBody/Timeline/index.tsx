import React, { CSSProperties } from 'react';
import styles from './styles.module.css'
import { TimePoint } from '../../types';
import { timeStamp } from 'console';

interface TimelineProps {
    timeline: TimePoint[]
}

function Timeline({ timeline }: TimelineProps) {
    const convertToTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const hoursS = hours > 9 ? `${hours}` : `0${hours}`;
        const minutesS = minutes > 9 ? `${minutes}` : `0${minutes}`;

        return hoursS + ':' + minutesS;
    }

    const convertToDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const day = date.getUTCDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayS = day > 9 ? `${day}` : `0${day}`;
        const monthS = month > 9 ? `${month}` : `0${month}`;
        const yearS = year.toString();

        return dayS + '/' + monthS + '/' + yearS;
    }

    return (
        <div className={styles.timelineWrapper}>
            {timeline.map((timepoint, idx) => {
                const prevContinuous = (idx > 0) && (timeline[idx - 1].end === timepoint.start)
                const nextContinuous = (idx < timeline.length - 1) && (timeline[idx + 1].start === timepoint.end)

                const prevContinuousStyle = prevContinuous ? styles.prevContinuous : '';
                const nextContinuousStyle = nextContinuous ? styles.nextContinuous : '';

                return (
                    <div 
                        className={`${prevContinuousStyle} ${nextContinuousStyle} ${styles.blockTimeline}`}
                        key={timepoint.blockId} 
                        style={{
                            height: timepoint.blockHeight + 50 + 'px'
                        } as CSSProperties}
                    >
                        {idx === 0 && <h4 className={styles.date}>{convertToDate(timepoint.start)}</h4>}

                        {!prevContinuous && (
                            <>
                                {(idx > 0) && (<div className={styles.connectingDot} />)}
                                <div className={`${styles.timepoint} ${styles.start}`}>
                                    <span>{convertToTime(timepoint.start)}</span>
                                </div>
                            </>
                        )}

                        <div className={`${styles.twoDots} ${styles.start}`} />
                        <div className={styles.line} />
                        <div className={`${styles.twoDots} ${styles.end}`} />

                        <div className={`${styles.timepoint} ${styles.end}`}>
                            <span>{convertToTime(timepoint.end)}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Timeline;
