let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');
let EventEmitter = require('events').EventEmitter;

let assign = require('object-assign');
let AppAPI = require('..utils/AppAPI.js');

let CHANGE_EVENT = 'change';

_items = [];

let AppStore = assign({}, EventEmitter.prototype, {
    emitChange: () => {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: (callback) => {
        this.on('change', callback);
    },
    removeChangeListener: (callback) => {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register((payload) => {
    let action = payload.action;

    switch(action.acttionType) {

    }
    return true
});

module.exports = AppStore;
