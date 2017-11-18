import expect from 'expect';
import 'babel-polyfill';
import MemberStore from '../../src/stores/MemberStore.js';
import groupMemberResponse from '../../src/__mock__/groupMemberResponse.json';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/MemberStore.js');

describe('Member Store', () => {
  describe('Test for addMember method', () => {
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

    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'ADD_MEMBER', member });
      expect(MemberStore.addMember()).toEqual(member);
    });
    it('should return an empty object on first call', () => {
      expect(MemberStore.addMember()).toEqual('');
    });
  });
});


describe('Member Store', () => {
  describe('Test for allGroupMembers method', () => {
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
});
