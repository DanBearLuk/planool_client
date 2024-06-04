import React, { FormEvent, useState } from 'react';
import styles from './styles.module.css';
import { BlockInfo } from '../../../types';
import Button from '../../../../Button';
import { EditInfo, EditTypes } from '../../../../../controllers/PlanEditorController/types';
import OverlayController from '../../../../../controllers/OverlayController';

interface EditModalProps {
    blockInfo: BlockInfo,
    handleEdits: (edits: EditInfo[]) => void
}

function EditModal({ blockInfo, handleEdits }: EditModalProps) {
    const [variables, setVariables] = useState<Record<string, string | number>>({
        startTime: blockInfo.startTime,
        endTime: blockInfo.endTime,
        widget: blockInfo.widget,
        ...Object.fromEntries(
            Object
                .entries(blockInfo.fields)
                .map(([k, v]) => ['field.' + k, v])
        )
    });

    const onInput = (type: 'date' | 'string' | 'number') => (e: React.ChangeEvent<any>) => {
        const fieldName = e.target.name;
        const rawValue = e.target.value;
        const processedValue = type === 'date'   ? Date.parse(rawValue) :
                               type === 'number' ? +rawValue : rawValue; 

        setVariables({ ...variables, [fieldName]: processedValue });
    };

    const onSave = (e: FormEvent) => {
        e.preventDefault();

        const edits: EditInfo[] = [];
        for (const [fieldName, value] of Object.entries(variables)) {
            const source: any = fieldName.startsWith('field.') ? blockInfo.fields : blockInfo;
            const fName = fieldName.startsWith('field.') ? fieldName.substring(6) : fieldName;

            if (source[fName] !== value) {
                edits.push({
                    type: EditTypes.ACTION,
                    stype: 'setFieldValue',
                    bid: blockInfo.id,
                    fname: fName,
                    val: value
                });
            }
        }

        if (edits.length > 0) {
            handleEdits(edits);
        }

        OverlayController.hideOverlay();
    };

    return (
        <div>
            <form className={styles.editForm}>
                <h1>Edit Block Parameters</h1>
                
                <label>Start Date: </label>
                <input 
                    type='date' 
                    name='startTime'
                    value={new Date(variables.startTime).toISOString().substring(0, 10)} 
                    onInput={onInput('date')}
                />

                <label>End Date: </label>
                <input 
                    type='date'
                    name='endTime'
                    value={new Date(variables.endTime).toISOString().substring(0, 10)} 
                    onInput={onInput('date')}
                />

                <label>Widget Type: </label>
                <select name='widget' value={variables.widget} onChange={onInput('string')}>
                    <option value='none'>None</option>
                    <option value='googleMapPlace'>Google Map (place)</option>
                    <option value='googleMapPath'>Google Map (path)</option>
                    <option value='gallery'>Gallery</option>
                </select>

                {Object.entries(variables).filter(([k]) => k.startsWith('field.')).map(([fieldName, value]) => (
                    <>
                        <label className={styles.variable}>{fieldName.substring(6)}:</label>
                        <input 
                            type='text' 
                            name={fieldName} 
                            value={value} 
                            onInput={onInput(typeof(value) === 'string' ? 'string' : 'number')} />
                    </>
                ))}

                <Button text='SAVE' type='submit' action={onSave} />
            </form>
        </div>
    )
}

export default EditModal;
