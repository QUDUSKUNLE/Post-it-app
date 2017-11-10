import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import memberResponse from '../../src/__mock__/memberResponse.json';
import registeredUsers from '../../src/__mock__/registeredUsers.json';
import { getGroupMember, getAllUsers, addMember }
  from '../../src/actions/memberActions';

describe('MemberAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve({ memberResponse }));
    if (memberResponse.response[0] === null) {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    } else {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    }
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getGroupMember Method', () => {
    const groupId = '-KwWEZj5RSYLAtP2TbDv';
    it('should dispatch an action', () => {
      getGroupMember(groupId).then(() => {
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ memberResponse });
        });
        expect(mockAxios.calledOnce).toBe(false);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(
          'GET_MEMBERS_OF_GROUP');
      });
    });
  });
});

describe('MemberAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve({ registeredUsers }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getAllUsers Method', () => {
    it('should dispatch an action', () => {
      getAllUsers().then(() => {
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ memberResponse });
        });
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('ALL_USERS');
      });
    });
  });
});

describe('AddMemberAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    const addMemberResponse = {
      response: 'Add member successfully' };
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ addMemberResponse }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for addMember Method', () => {
    it('should dispatch an action', () => {
      expect(addMember).toBeDefined();
    });

    it('should dispatch an action', () => {
      const memberDetails = { groupId: '-KwZyowDPR6PAQmGIRcw',
        memberId: 'SUL5pAUsQmV3FxNQXIb9hXFbI8h2', group: 'abuja' };
      addMember(memberDetails).then(() => {
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ memberResponse });
        });
        expect(mockAxios.calledOnce).toBe(false);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_MEMBERS' +
          '_OF_GROUP');
      });
    });
  });
});
