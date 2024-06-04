import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

interface Toast {
    id: string,
    title: string,
    description?: string,
    color: string
}

interface ToastArgs {
    title: string,
    description?: string,
    color: string,
    ttl: number
}

interface ToastControllerState {
    toasts: Toast[],
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>
}

class ToastController extends React.Component<any, ToastControllerState> {
    static _instance?: ToastController;

    constructor(props: any) {
        super(props);
        ToastController._instance = this;
        
        this.state = {
            toasts: [],
            setToasts: () => {}
        };
    }

    static pushToast({ title, description, color, ttl }: ToastArgs) {
        const id = uuidv4();
        const controller = ToastController._instance;

        controller?.setState((prevState) => ({ 
            toasts: [...prevState.toasts, {
                id,
                title,
                description,
                color
            }]
        }));

        setTimeout(() => controller?.setState((prevState) => ({
            toasts: prevState.toasts.filter(toast => toast.id !== id)
        })), ttl);
    }
    
    render = () => (
        <div className={styles.toastsWrapper}>
            {this.state.toasts.map((toast, i) => (
                <div 
                    key={i} 
                    className={styles.toastBody} 
                    style={{ '--highlight-color': toast.color } as React.CSSProperties}
                >
                    <h1>{toast.title}</h1>
                    
                    {toast.description && (
                        <p>{toast.description}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ToastController;