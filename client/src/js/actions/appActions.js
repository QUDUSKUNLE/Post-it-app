import axios from 'axios';
import firebase from 'firebase';
import config from '../vendors/vendors.js';

// user sign out Action
export const signoutAction = () => axios.post('/signout');

// create group Action
export const createGroup = (group) => axios.post('/creategroup', group);

// send message Action
export const sendMessage = (mess) => axios.post('/groupName/message', mess);

// delete user account Action
export const deleteAccount = () => axios.post('/delete');

// add mmmber to group
export const addMember = (member) => axios.post('/group/member', member);

// isLoggedIn
export const isLoggedIn = (user) => {
  firebase.initializeApp(config);
  let LoggedIn;
  firebase.auth().onAuthStateChanged(() => {
    if (user) {
      LoggedIn = true;
    } else {
      LoggedIn = false;
    }
    return LoggedIn;
  });
};
