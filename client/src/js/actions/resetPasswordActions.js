import axios from 'axios';

/**
 * @description - Reset Password Action
 * @param {object} email - { johndoe@example.cpm }
 * @returns {object} object
 */
export const resetPassword = (email) => axios.post('/passwordreset', email);
