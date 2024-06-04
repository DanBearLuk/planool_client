import React, { MouseEventHandler } from 'react';
import styles from './styles.module.css';

interface ButtonProps {
    text: string,
    type?: 'button' | 'submit',
    action?: MouseEventHandler<HTMLInputElement>,
    style?: React.CSSProperties,
    className?: string,
    shouldClipBackground?: boolean,
    doesTextCastShadow?: boolean
}

function Button({ 
    text,
    type = 'button',
    action,
    className = '',
    style = {},
    shouldClipBackground = false, 
    doesTextCastShadow = false
} : ButtonProps) {
    const backgroundClip = shouldClipBackground ? styles.backgroundClip : '';
    const textShadow = doesTextCastShadow ? styles.textShadow : '';

    return (
        <input
            className={`${styles.button} ${backgroundClip} ${textShadow} ${className} growOnHover`}
            style={style}
            type={type}
            value={text}
            onClick={action}
        />
    );
}

export default Button;
