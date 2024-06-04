export class FetchError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

export async function handleFetchResponse(fetchResult) {
    let response;

    if (fetchResult.headers.get('content-type').includes('application/json')) {
        response = await fetchResult.json();
    } else {
        response = {};
    }

    if (fetchResult.ok) {
        return response;
    } else {
        throw new FetchError(
            fetchResult.status, 
            response.message || 'Unidentified error'
        );
    }
}
