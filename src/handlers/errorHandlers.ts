import ToastController from '../controllers/ToastController';
import { FetchError } from '../services/utilities';

export const handleFetchError = (error: FetchError) => ToastController.pushToast({
    title: `Error code: ${error.status}`,
    description: error.message,
    color: 'var(--error-highlight-color)',
    ttl: 5000
});

export const handleUnknownError = (error: Error) => ToastController.pushToast({
    title: 'Error',
    description: 'An unknown error has occured',
    color: 'var(--error-highlight-color)',
    ttl: 5000
});
