import axios from 'axios';
// user sign in Action
export const signinAction = (user) => axios.post('/signin', user);
