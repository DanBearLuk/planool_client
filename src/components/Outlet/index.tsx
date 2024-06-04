import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import useAnimatedState from '../../hooks/useAnimatedState';

interface OverlayProps {
    header?: React.ReactNode,
    children?: React.ReactNode,
    isHeaderFixed?: boolean,
    isHeaderHideable?: boolean
}

function Outlet({ header, children, isHeaderFixed = false, isHeaderHideable = false }: OverlayProps) {
    const headerFixed = isHeaderFixed ? styles.fixed : '';

    const [headerOffset, setHeaderOffset] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    const lastScrollInfo = useRef({ 
        scrollY: window.scrollY, 
        scrollDir: 'up'
    });

    useEffect(() => {
        if (!isHeaderHideable) return;

        const onScroll = () => {
            const scrollInfo = lastScrollInfo.current;
    
            if (window.scrollY === scrollInfo.scrollY) return;
    
            const currentScrollDirection = window.scrollY > scrollInfo.scrollY ? 'down' : 'up';
            scrollInfo.scrollY = window.scrollY;
    
            if (currentScrollDirection !== scrollInfo.scrollDir) {
                scrollInfo.scrollDir = currentScrollDirection;
                setHeaderOffset(currentScrollDirection === 'up' ? 0 : -headerHeight);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [headerHeight, isHeaderHideable]);

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.clientHeight;
            setHeaderHeight(height);
        }
    }, []);

    return (
        <div 
            className={styles.outlet} 
            style={{ 
                '--top-offset': headerOffset + 'px', 
                '--header-height': headerHeight + 'px' 
            } as React.CSSProperties}
        >
            <div className={`${styles.outletHeader} ${headerFixed}`} ref={headerRef}>
                {header}
            </div>

            <div className={styles.outletWrapper}> 
                <div className={styles.outletContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Outlet;
