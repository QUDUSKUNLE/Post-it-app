import axios from 'axios';

// reset Password Action
export const resetPassword = (email) => axios.post('/passwordreset', email);
