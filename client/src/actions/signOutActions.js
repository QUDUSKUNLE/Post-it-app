import axios from 'axios';
/**
 * @description - An action that makes API call to server
 *  to sign out users
 * @returns {Object} Object - server response
 */
const signOutAction = () => axios.post('/api/v1/signout');

export default signOutAction;

