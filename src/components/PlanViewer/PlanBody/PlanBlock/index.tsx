import React from 'react';
import styles from './styles.module.css'
import { BlockInfo } from '../../types';
import StructureSubBlock from './StructureSubBlock';
import Button from '../../../Button';
import OverlayController from '../../../../controllers/OverlayController';
import EditModal from './EditModal';
import { EditInfo } from '../../../../controllers/PlanEditorController/types';
import Editable from '../../../Editable';

interface PlanBlockProps {
    blockInfo: BlockInfo,
    isEditable?: boolean,
    onEdit?: (edit: EditInfo) => void,
    background: string,
    fontColor: string
}

function PlanBlock({ blockInfo, isEditable = false, onEdit, background, fontColor }: PlanBlockProps) {
    const hasWidgetStyle = blockInfo.widget ? styles.hasWidget : '';

    const handleEdits = (edits: EditInfo[]) => edits.forEach(edit => onEdit?.(edit));

    const showEditModal = () => {
        OverlayController.showOverlay({ 
            element: <EditModal blockInfo={blockInfo} handleEdits={handleEdits} /> 
        });
    }

    return (
        <div className={`${styles.blockWrapper} ${hasWidgetStyle}`} style={{ '--background': background, '--block-text-color': fontColor } as React.CSSProperties}>
            <div className={styles.blockHeader}>
                <h1>
                    <Editable isEnabled={isEditable} onEdit={onEdit}>{blockInfo.title}</Editable>
                </h1>
                <object data={`/blockIcons/${blockInfo.icon}.svg`}>
                    {blockInfo.icon}
                </object>
            </div>
            
            <div className={styles.blockContent}>
                {blockInfo.structure.map((structRowInfo, idx) => (
                    <div className={styles.structureRow} key={idx}>
                        {structRowInfo.map((structInfo, idx) => (
                            <StructureSubBlock 
                                structInfo={structInfo} 
                                blockInfo={blockInfo} 
                                isEditable={isEditable} 
                                key={idx} 
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.widgetWrapper}>
                <img src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg' />
            </div>

            {isEditable && (
                <Button text='' className={styles.editButton} action={showEditModal} />
            )}
        </div>
    );
}

export default PlanBlock;
