import React, { createContext, useContext, useEffect, useState } from 'react';
import SocketController from '../controllers/SocketController';
import { useUser } from './UserContext';

const SocketControllerContext = createContext<[SocketController | undefined, number]>([
    undefined,
    WebSocket.CLOSED
]);

export function SocketControllerProvider({ children } : { children: React.ReactNode }) {
    const { user } = useUser();
    const [controller, setController] = useState<SocketController | undefined>();
    const [state, setState] = useState<number>(WebSocket.CLOSED);

    useEffect(() => {
        if (!user) return;

        const newController = new SocketController();
        const listener = () => setState(newController.socket.readyState);

        newController.addEventListener('statechange', listener);
        setController(newController);

        return () => {
            newController.removeEventListener('statechange', listener);
            newController.close();
        }
    }, [user]);

    return (
        <SocketControllerContext.Provider value={[controller, state]}>
            {children}
        </SocketControllerContext.Provider>
    )
}

export const useSocketController = () => useContext(SocketControllerContext);
