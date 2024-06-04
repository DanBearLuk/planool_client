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
