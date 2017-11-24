import expect from 'expect';
import GroupStore from '../../src/stores/GroupStore.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import mockData from '../../src/__mock__/mockData';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/GroupStore.js');

describe('Group Store', () => {
  // test for allGroups Method
  describe('test for allGroups method', () => {
    let groups;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      groups = mockData.groupStoreGroups;
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

  // Test for createGroup Method
  describe('createGroup method', () => {
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
