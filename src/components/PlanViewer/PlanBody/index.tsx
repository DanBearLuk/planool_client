import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import { PlanInfo, TimePoint } from '../types';
import PlanBlock from './PlanBlock';
import Timeline from './Timeline';
import { EditInfo } from '../../../controllers/PlanEditorController/types';

interface PlanBodyProps {
    planInfo: PlanInfo,
    isEditMode?: boolean,
    onEdit?: (edit: EditInfo) => void
}

function PlanBody({ planInfo, isEditMode = false, onEdit }: PlanBodyProps) {
    const [timeline, setTimeline] = useState<TimePoint[]>([]);
    const planRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeline(planInfo.blocks.map((block, idx): TimePoint => ({
            start: block.startTime,
            end: block.endTime,
            country: block.venue.country,
            city: block.venue.city,
            blockHeight: planRef.current?.children[idx].clientHeight || 0,
            blockId: block.id
        })));
    }, [planInfo, isEditMode]);

    return (
        <div className={styles.planWrapper}>
            <div ref={planRef} className={styles.plan}>
                {planInfo.blocks.map((block, idx) => (
                    <PlanBlock 
                        blockInfo={block} 
                        isEditable={isEditMode} 
                        onEdit={onEdit} 
                        key={idx}
                    />
                ))}
            </div>

            <Timeline timeline={timeline} />
        </div>    
    );
}

export default PlanBody;
