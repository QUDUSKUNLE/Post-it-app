import axios from 'axios';
/**
 * @description - Sign out Action
 * @returns {Object} Object -
 */
const signOutAction = () => axios.post('/api/v1/signout');

export default signOutAction;

