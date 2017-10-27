import GroupStore from '../../src/stores/GroupStore';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import expect from 'expect';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/GroupStore.js');

describe('Group Store', () => {
  describe('Test for allGroups method', () => {
    let groups;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      groups = {
        message: 'Registration successful and verification' +
        ' email sent to your email'
      };
    });
    afterEach(() => {
      GroupStore.handleActions({
        type: 'GET_USER_GROUPS', groups: []
      });
    });
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'GET_USER_GROUPS', groups });
      expect(GroupStore.allGroups()).toEqual(groups);
    });
    it('should return an empty object on first call', () => {
      expect(GroupStore.allGroups()).toEqual([]);
    });
  });
});

describe('Group Store', () => {
  describe('Test for allGroups method', () => {
    let message;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      message = 'Group created successfully';
    });
    afterEach(() => {
      GroupStore.handleActions({
        type: 'CREATE_GROUP', message: ''
      });
    });
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'CREATE_GROUP', message });
      expect(GroupStore.createGroup()).toEqual(message);
    });
    it('should return an empty object on first call', () => {
      expect(GroupStore.createGroup()).toEqual('');
    });
  });
});

describe('Group Store', () => {
  describe('Test for allGroups method', () => {
    let error;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      error = 'Group already exists';
    });
    afterEach(() => {
      GroupStore.handleActions({
        type: 'CREATE_GROUP_ERROR', error: ''
      });
    });
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'CREATE_GROUP_ERROR', error });
      expect(GroupStore.createGroup()).toEqual(error);
    });
    it('should return an empty object on first call', () => {
      expect(GroupStore.createGroup()).toEqual('');
    });
  });
});
