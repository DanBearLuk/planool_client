import React from 'react';
import styles from './styles.module.css';

const navBarLinks = {
    'Events near you': '/events',
    'Most popular events': '/events',
    'All events': '/events',
    'About': '/about'
};

function NavBar() {
    return (
        <div className={styles.navBar}>
            {Object.entries(navBarLinks).map(([title, link], idx) => (
                <div key={idx} className={`${styles.navLink} growOnHover`}>
                    {title}
                </div>
            ))}
        </div>
    );
}

export default NavBar;
