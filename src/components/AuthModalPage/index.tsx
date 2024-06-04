import React, { useState } from 'react';
import styles from './styles.module.css';
import OverlayController from '../../controllers/OverlayController';
import Button from '../Button';
import { useUser } from '../../contexts/UserContext';
import { login, signup } from '../../services/users';
import { handleFetchError, handleUnknownError } from '../../handlers/errorHandlers';
import { FetchError } from '../../services/utilities';
import ToastController from '../../controllers/ToastController';

interface AuthModalPageProps {
    type?: 'login' | 'signup'
}

function AuthModalPage({ type = 'login' }: AuthModalPageProps) {
    const { setUser } = useUser();
    const typeStyle = type === 'login' ? styles.signIn : styles.signUp;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeAuthType = () => {
        OverlayController.updateModal({ 
            element: <AuthModalPage type={type === 'login' ? 'signup' : 'login'} /> 
        });
    };

    const tryToLogIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await login(username, password);
            setUser?.(result);
            OverlayController.hideOverlay();

            ToastController.pushToast({
                title: 'Successfully logged in',
                color: 'var(--successful-highlight-color)',
                ttl: 5000
            });
        } catch (e: any) {
            if (e instanceof FetchError) {
                handleFetchError(e);
            } else {
                handleUnknownError(e);
            }
        }
    };

    const tryToSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signup(username, password);
            changeAuthType();

            ToastController.pushToast({
                title: 'Successfully logged in',
                color: 'var(--successful-highlight-color)',
                ttl: 5000
            });
        } catch (e: any) {
            if (e instanceof FetchError) {
                handleFetchError(e);
            } else {
                handleUnknownError(e);
            }
        }
    };

    const onSubmit = type === 'login' ? tryToLogIn : tryToSignUp;

    return (
        <div className={`${styles.authWrapper} ${typeStyle}`}>
            <div className={styles.authBackground} />
            
            <form className={styles.authForm} onSubmit={() => {}} onSubmitCapture={onSubmit}>
                <h1>{type === 'login' ? 'LOG IN' : 'SIGN UP'}</h1>

                <label htmlFor='username'>Username</label>
                <div className={styles.inputWrapper}>
                    <input 
                        id='username' 
                        type='text' 
                        value={username} 
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                </div>
                
                <label htmlFor='password'>Password</label>
                <div className={styles.inputWrapper}>
                    <input 
                        id='password' 
                        type='password' 
                        value={password} 
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                </div>

                <Button
                    text='SUBMIT'
                    type='submit'
                    style={{ backgroundImage: 'var(--background-color)', padding: '10px 45px' }}
                />

                <div>
                    <span>OR</span>

                    <Button
                        text={type === 'login' ? 'SIGN UP' : 'LOG IN'}
                        action={changeAuthType} 
                        style={{ backgroundImage: 'var(--alternate-color)', padding: '0', textDecoration: 'underline' }}
                        shouldClipBackground
                    />
                </div>
            </form>

            <input className={styles.closeBtn} type='button' onClick={() => OverlayController.hideOverlay()}/>
        </div>
    );
}

export default AuthModalPage;
