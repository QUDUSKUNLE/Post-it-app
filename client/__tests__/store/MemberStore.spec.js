import expect from 'expect';
import 'babel-polyfill';
import MemberStore from '../../src/stores/MemberStore.js';
import groupMemberResponse from '../../src/__mock__/groupMemberResponse.json';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/MemberStore.js');

describe('Member Store', () => {
  // Add member method
  describe('test for addMember method', () => {
    let member;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      member = 'Add member successfully';
    });

    afterEach(() => {
      MemberStore.handleActions({
        type: 'ADD_MEMBER', member: ''
      });
    });

    it(`should return response when action ADD_MEMBER action is dispatched
    to the store`, () => {
      AppDispatcherMock({ type: 'ADD_MEMBER', member });
      expect(MemberStore.addMember()).toEqual(member);
    });
    it('should return an empty object on first call', () => {
      expect(MemberStore.addMember()).toEqual('');
    });
  });

  // allGroupMembers method
  describe('allGroupMembers method', () => {
    let members;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      members = groupMemberResponse.response;
    });

    afterEach(() => {
      MemberStore.handleActions({
        type: 'GET_MEMBERS_OF_GROUP', members
      });
    });

    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'GET_MEMBERS_OF_GROUP', members });
      const response = MemberStore.allGroupMembers();
      expect(response[1]).toEqual(members[2]);
    });
  });

  // allGroupMembers method
  describe('searchUser method', () => {
    let search;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      search = groupMemberResponse.response;
    });

    afterEach(() => {
      MemberStore.handleActions({
        type: 'SEARCH_USER', search: []
      });
    });

    it(`should return response when action SEARCH_USER action is dispatched
     to MemberStore store`, () => {
      AppDispatcherMock({ type: 'SEARCH_USER', search });
      const response = MemberStore.getSearchUser();
      expect(response).toEqual(search);
    });

    it(`should return an empty object on first call when no action
     is dispatched to the store`, () => {
      expect(MemberStore.getSearchUser()).toEqual([]);
    });
  });
});
