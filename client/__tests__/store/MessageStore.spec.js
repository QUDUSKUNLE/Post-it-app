import expect from 'expect';
import 'babel-polyfill';
import MessageStore from '../../src/stores/MessageStore';
import getMessageResponse from '../../src/__mock__/getMessageResponse.json';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import { helpGetGroupMessages } from '../../src/helper/formatResponse';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/MessageStore.js');


describe('Message Store', () => {
  // allGroupMessage method
  describe('allGroupMessage method', () => {
    let message;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      message = helpGetGroupMessages(getMessageResponse.response);
    });
    afterEach(() => {
      MessageStore.handleActions({
        type: 'SEND_GROUP_MESSAGE', message: []
      });
    });
    it(`should return response when SEND_GROUP_MESSAGE action type is
     dispatched to the store`, () => {
      AppDispatcherMock({ type: 'SEND_GROUP_MESSAGE', message });
      expect(MessageStore.allGroupMessage()).toEqual([message]);
    });
  });
  // allGroupMessage method
  describe('allGroupMessage method', () => {
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
    it('should return an empty object on first call when nothing is dispatched',
    () => {
      expect(MessageStore.allGroupMessage()).toEqual([]);
    });
  });
});
