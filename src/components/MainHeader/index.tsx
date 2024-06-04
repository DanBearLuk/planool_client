import React from 'react';
import Header from '../Header';
import NavBar from './NavBar';
import AuthButtons from './AuthButtons';
import styles from './styles.module.css';
import { useUser } from '../../contexts/UserContext';
import UserPanel from './UserPanel';

function MainHeader() {
    const { user } = useUser();

    return (
        <Header 
            leftBlock={<img className={styles.logo} src='/general/logo(title).svg' alt='header'></img>}
            centerBlock={<NavBar />}
            rightBlock={!user ? <AuthButtons /> : <UserPanel />}
        />
    )
}

export default MainHeader;
