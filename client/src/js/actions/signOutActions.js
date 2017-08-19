import axios from 'axios';


// user sign out Action
export const signoutAction = () => axios.post('/signout');
