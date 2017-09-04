import axios from 'axios';

/**
  * @description - Sign Up Action
  * @param {object} user - { email, password, username }
  * @returns {function} Object -
*/
export const signupAction = (user) => axios.post('/signup', user);
