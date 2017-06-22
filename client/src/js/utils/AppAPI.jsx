// import request from 'superagent';
// const Promise = require('es6-promise').Promise; // jshint ignore:line

/**
 * Wrapper for calling a API
 */
// import ActionTypes from '../actions/AppActions';
import axios from 'axios';
export const AppAPI = {
  saveMember(member) {
    axios.post('/user/signup', {
      username: member.name,
      password: member.phone,
      email: member.email
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  getMembers() {
    axios.get('/user/database')
      .then((response) => {
        console.log(response);
        // ActionTypes.recieveContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
