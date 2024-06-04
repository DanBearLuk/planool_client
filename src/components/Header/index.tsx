import React from 'react';
import styles from './styles.module.css';

interface HeaderProps {
    leftBlock?: React.ReactNode,
    centerBlock?: React.ReactNode,
    rightBlock?: React.ReactNode,
    style?: React.CSSProperties
}

function Header({ leftBlock, centerBlock, rightBlock, style = {} }: HeaderProps) {
    return (
        <header className={styles.header} style={style}>
            <div className={styles.wrapper}>
                <div className={styles.leftBlock}>
                    {leftBlock}
                </div>
                
                <div className={styles.centerBlock}>
                    {centerBlock}
                </div>
                
                <div className={styles.rightBlock}>
                    {rightBlock}
                </div>
            </div>
        </header>
    );
}

export default Header;
