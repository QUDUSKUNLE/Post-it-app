import axios from 'axios';

// user sign up Action
export const signupAction = (user) => axios.post('/signup', user);
