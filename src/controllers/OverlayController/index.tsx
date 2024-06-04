import React, { MouseEvent } from 'react';
import styles from './styles.module.css';

interface overlayState {
    isDisappearing: boolean,
    isHidden: boolean,
    element?: React.ReactNode,
    onClosed?: (() => void) | null
}

interface overlayArgs {
    element: React.ReactNode,
    onClosed?: (() => void) | null
}

class OverlayController extends React.Component<any, overlayState> {
    static _instance?: OverlayController;

    constructor(props: any) {
        super(props);

        OverlayController._instance = this;

        this.state = {
            isDisappearing: false,
            isHidden: true,
            element: null,
            onClosed: null
        };
    }

    static showOverlay({ element, onClosed = null }: overlayArgs) {
        OverlayController._instance?.show({ element, onClosed });
    }

    static hideOverlay() {
        OverlayController._instance?.hide();
    }

    static updateModal({ element, onClosed = null }: overlayArgs) {
        OverlayController._instance?.updateModal({ element, onClosed });
    }

    show({ element, onClosed }: overlayArgs) {
        this.setState({ 
            isDisappearing: false,
            isHidden: false,
            element,
            onClosed
        });
    }

    updateModal({ element, onClosed }: overlayArgs) {
        this.setState({
            element,
            onClosed
        });
    }

    hide() {
        this.state.onClosed?.();

        this.setState({
            isDisappearing: true,
            isHidden: false,
        });

        setTimeout(() => this.setState({
            isDisappearing: false,
            isHidden: true,
            element: null,
            onClosed: null
        }), 0.35 * 1000);
    }

    render() {
        const onClick = (event: MouseEvent) => {
            if (event.target === document.getElementById('overlayController')) {
                this.hide();
            }
        };

        const disappearing = this.state.isDisappearing ? styles.disappearing : '';

        return (
            <div
                id='overlayController'
                className={`${styles.overlayWrapper} ${disappearing}`}
                hidden={this.state.isHidden}
                onMouseDown={onClick}
            >
                {this.state.element}
            </div>
        );
    }
}

export default OverlayController;
