import React, { useEffect, useState } from 'react';
import { EditInfo, EditTypes } from '../../controllers/PlanEditorController/types';

interface EditableProps {
    children: string,
    isEnabled?: boolean, 
    onEdit?: (edit: EditInfo) => void
}

const Editable = ({ children, isEnabled = true, onEdit }: EditableProps) => {
    const [value, setValue] = useState(children);

    useEffect(() => {
        setValue(children);
    }, [children]);

    const onInput = (e: React.ChangeEvent<HTMLSpanElement>) => {
        const target = e.target;
        const inputEvent = e.nativeEvent as InputEvent;

        if (target.innerText === value) return;

        setValue(target.innerText || '');

        const [selStart, selEnd] = getSelection();

        let result;
        switch (inputEvent.inputType) {
            case ('insertText'): {
                result = handleInsertText(inputEvent.data || '', selStart, selEnd);
                break;
            }
        };

        if (result) onEdit?.(result);
    };

    const onPaste = (e: React.ClipboardEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement;

        if (target.innerText === value) return;

        setValue(target.innerText || '');

        const [selStart, selEnd] = getSelection();

        handlePasteText(e.clipboardData.getData('Text'), selStart, selEnd);
    };

    return (
        <span contentEditable={isEnabled} onInput={onInput} onPaste={onPaste}>{value}</span>
    );
}

const getSelection = () => {
    const sel = document.getSelection();
    let selStart = sel?.anchorOffset || 0;
    let selEnd = sel?.focusOffset || 0;

    if (selStart > selEnd) {
        [selStart, selEnd] = [selEnd, selStart];
    }

    return [selStart, selEnd];
}

const handleInsertText = (text: string, selStart: number, selEnd: number): EditInfo => {
    return {
        type: EditTypes.INSERT,
        p: selStart,
        d: text
    };
}

const handlePasteText = (text: string, selStart: number, selEnd: number) => {
    console.log('paste: ', text, selStart, selEnd);
}

export default Editable;
