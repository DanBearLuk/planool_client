import React from 'react';
import Button from '../../Button';
import styles from './styles.module.css';
import OverlayController from '../../../controllers/OverlayController';
import AuthModalPage from '../../AuthModalPage';

function AuthButtons() {
    return (
        <div className={styles.authBtnsWrapper}>
            <Button 
                text='SIGN UP' 
                action={() => OverlayController.showOverlay({ element: <AuthModalPage type='signup' /> })} 
                style={{ backgroundImage: 'var(--first-gradient)' }}
                shouldClipBackground
            />
            <Button 
                text='LOG IN' 
                action={() => OverlayController.showOverlay({ element: <AuthModalPage type='login' /> })} 
                style={{ backgroundImage: 'var(--second-gradient)' }}
                doesTextCastShadow
            />
        </div>
    );
}

export default AuthButtons;