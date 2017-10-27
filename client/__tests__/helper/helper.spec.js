import {
  helpGetRegisteredUsers,
  helpGetGroupMessages,
  helpGetGroups,
  getGroupMembers
} from '../../src/helper/helper';
import registeredUsers from '../../src/__mock__/registeredUsers.json';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';
import groupResponse from '../../src/__mock__/groupResponse.json';
import groupMemberResponse from '../../src/__mock__/groupMemberResponse.json';
import 'babel-polyfill';


describe('helper ', () => {
  describe('helpGetRegisteredUsers function helps', () => {
    it('destructure array of object from axios response', () => {
      expect(typeof helpGetRegisteredUsers(registeredUsers)).toEqual('object');
    });
  });
});


describe('helper ', () => {
  describe('helpGetGroupMessages function helps', () => {
    it('destructure array of object from axios response', () => {
      expect(typeof helpGetGroupMessages(groupMessageResponse.response)).toEqual('object');
    });
  });
});


describe('helper ', () => {
  describe('helpGetGroups function helps', () => {
    it('destructure object of array from axios response', () => {
      expect(typeof helpGetGroups(groupResponse.response)).toEqual('object');
    });
  });
});


describe('helper ', () => {
  describe('getGroupMembers function helps', () => {
    it('destructure object of array from axios response', () => {
      const data = [(groupMemberResponse.response)[0]];
      expect(typeof getGroupMembers(data)).toEqual('object');
    });
  });
});
