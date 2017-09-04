import axios from 'axios';


/**
  * @description - Get members of a group
  * @param {nill} nill - { }
  * @returns {Object} Object -
*/
export const signoutAction = () => axios.post('/signout');
