import axios from 'axios';


/**
  * @description - Get members of a group
  * @param {null} null - { }
  * @returns {Object} Object -
*/
export const signoutAction = () => axios.post('/signout');
