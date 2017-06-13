import request from 'superagent';
const Promise = require('es6-promise').Promise; // jshint ignore:line

/**
 * Wrapper for calling a API
 */
const Api = {
  get: function(url) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end(function(res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};

module.exports = Api;
