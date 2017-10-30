import axios from 'axios';
/**
 * @description - Sign out Action
 * @returns {Object} Object -
 */
const signoutAction = () => axios.post('/api/v1/signout');

export default signoutAction;

