import { ADDRESSES } from '../config';
import { handleFetchResponse } from './utilities';

export async function login(username, password) {
    const result = await fetch(ADDRESSES.API + '/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return (await handleFetchResponse(result)).user;
}

export async function relogin() {
    const result = await fetch(ADDRESSES.API + '/users/relogin', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return (await handleFetchResponse(result)).user;
}

export async function signup(username, password) {
    const result = await fetch(ADDRESSES.API + '/users/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return await handleFetchResponse(result);
}
