import axios from 'axios';

/**
  * @description - Sign in Action
  * @param {object} user - { email, password }
  * @returns {Object} Object
*/
export const signinAction = (user) => axios.post('/signin', user);
