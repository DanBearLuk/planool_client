import validator from 'validator';

function isTrimmable(str) {
    return str.trim().length !== str.length;
}

export const validateAuthInfo = ({ username, password }) =>
    validator.isAlphanumeric(username, 'en-US', { ignore: ' -_' }) && 
    !isTrimmable(username) &&
    validator.isLength(username, { min: 3, max: 16 });
