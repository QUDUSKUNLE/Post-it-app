import axios from 'axios';
/**
  * @description - Sign out Action
  * @returns {Object} Object -
*/
export const signoutAction = () => axios.post('/signout');
