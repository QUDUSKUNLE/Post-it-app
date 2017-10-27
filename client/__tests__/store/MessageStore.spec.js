import MessageStore from '../../src/stores/MessageStore';
import getMessageResponse from '../../src/__mock__/getMessageResponse.json';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import { helpGetGroupMessages } from '../../src/helper/helper';
import expect from 'expect';
import 'babel-polyfill';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/MessageStore.js');


describe('Member Store', () => {
  describe('Test for addMember method', () => {
    let message;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      message = message = helpGetGroupMessages(getMessageResponse.response);
    });
    afterEach(() => {
      MessageStore.handleActions({
        type: 'SEND_GROUP_MESSAGE', message: []
      });
    });
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'SEND_GROUP_MESSAGE', message });
      expect(MessageStore.allGroupMessage()).toEqual([message]);
    });
  });
});

describe('Message Store', () => {
  describe('Test for allGroupMessage method', () => {
    let message;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      message = helpGetGroupMessages(getMessageResponse.response);
    });
    afterEach(() => {
      MessageStore.handleActions({
        type: 'GET_GROUP_MESSAGE', message: []
      });
    });
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'GET_GROUP_MESSSAGE', message });
      expect(MessageStore.allGroupMessage()).toEqual([message, []]);
    });
    it('should return an empty object on first call', () => {
      expect(MessageStore.allGroupMessage()).toEqual([]);
    });
  });
});

