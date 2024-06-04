import React from 'react';
import styles from './styles.module.css';
import { BlockInfo, StructureInfo } from '../../../types';

interface StructureSubBlockProps {
    structInfo: StructureInfo, 
    blockInfo: BlockInfo,
    isEditable?: boolean
}

function StructureSubBlock({ structInfo, blockInfo, isEditable = false }: StructureSubBlockProps) {
    let structureBlock = <></>;

    const re = /%(.+?)%/g;
    const formatText = (text: string) => {
        const replacer = (_: string, fieldName: string) => blockInfo.fields[fieldName];
        return text.replace(re, replacer);
    };

    switch (structInfo.type) {
        case 'text': {
            const text = formatText(structInfo.text || '');
            structureBlock = (
                <p 
                    className={`${styles.textSubBlock} ${structInfo.style || ''}`} 
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}>
                    {isEditable ? structInfo.text || '' : text}
                </p>
            ); 
            break;
        }
        
        case 'infoCell': {
            structureBlock = (
                <div className={`${styles.infoSubBlock}`}>
                    <object data={`/blockIcons/${structInfo.icon}.svg`}>
                        {structInfo.icon}
                    </object>
                    <span>{formatText(structInfo.text || '')}</span>
                </div>
            ); 
            break;
        }
        
        case 'description': {
            const text = formatText(blockInfo.description || '');
            structureBlock = (
                <p 
                    className={`${styles.textSubBlock} ${structInfo.style || ''}`} 
                    contentEditable={isEditable} 
                    suppressContentEditableWarning={true}>
                    {isEditable ? blockInfo.description : text}
                </p>
            );
            break;
        }
        
        default: break;
    }

    return structureBlock;
}

export default StructureSubBlock;
