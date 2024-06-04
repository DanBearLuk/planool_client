import React, { createContext, useContext, useEffect, useState } from 'react';
import { relogin } from '../services/users';

interface UserProperties {
    id: number,
    username: string,
    password: string,
    avatarUrl: string,
    firstName: string,
    secondName: string,
    info: string,
    age: number,
    chats: Object[],
    friends: number[],
    friendRequests: {
        inbox: Object[],
        outbox: Object[]
    },
    createdPlans: number[],
    favoritePlans: number[],
    lastNotificationId: number,
    notifications: Object[],
    isFavoritesVisible: boolean
};

interface UserContextsProperties {
    user: UserProperties | null
    setUser: React.Dispatch<React.SetStateAction<UserProperties | null>> | null
}

const UserContext = createContext<UserContextsProperties>({ 
    user: null, 
    setUser: null 
});

export function UserProvider({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProperties | null>(null);

    useEffect(() => {
        const tryToRelogin = async () => {
            try {
                const userInfo = await relogin();
                setUser(userInfo);
            } catch (e) {
                console.log('No valid auth session');
            }
        };

        tryToRelogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
