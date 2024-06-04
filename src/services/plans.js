import { ADDRESSES } from '../config';
import { handleFetchResponse } from './utilities';

export async function viewPlan(planId) {
    const result = await fetch(ADDRESSES.API + `/plans/${planId}/view`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await handleFetchResponse(result);
}

export async function getPlans(planIds) {
    const result = await fetch(ADDRESSES.API + `/plans/get`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            planIds
        })
    });

    return await handleFetchResponse(result);
}
