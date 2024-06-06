import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../Button';

interface EditModeButtonProps {
    onStateChanged: (isEnabled: boolean) => void
}

function EditModeButton({ onStateChanged }: EditModeButtonProps) {
    const [isEnabled, setIsEnabled] = useState(false);
    const enabled = isEnabled ? styles.enabled : '';

    const onClick = () => {
        onStateChanged(!isEnabled);
        setIsEnabled(!isEnabled);
    };

    return (
        <Button 
            text='' 
            className={`${styles.editButton} ${enabled}`}
            action={onClick}
        />
    )
}

export default EditModeButton;
