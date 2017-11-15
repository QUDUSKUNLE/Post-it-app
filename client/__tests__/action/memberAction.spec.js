import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import memberResponse from '../../src/__mock__/memberResponse.json';
import registeredUsers from '../../src/__mock__/registeredUsers.json';
import { getGroupMember, getAllUsers, addMember }
  from '../../src/actions/memberAction';

describe('getGroupMembers', () => {
  let mockGetGroupMembers;
  let dispatchSpy;

  beforeEach(() => {
    mockGetGroupMembers = sinon.stub(axios, 'get').callsFake(() =>
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
        expect(mockGetGroupMembers.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(
          'GET_MEMBERS_OF_GROUP');
      });
    });
  });
});

describe('Test for getAllUsers', () => {
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
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('ALL_USERS');
      });
    });
  });
});

describe('Test for getAllUsers error', () => {
  let mockGetAllUsersError;
  const response = { data: {
    message: 'No user found' }
  };

  beforeEach(() => {
    mockGetAllUsersError = sinon.stub(axios, 'get').callsFake(() =>
      Promise.reject(response));
  });

  afterEach(() => {
    axios.get.restore();
  });

  describe('Test for getAllUsers Method', () => {
    it('should throw error if error is encountered', () => {
      getAllUsers().catch(() => {
        expect(mockGetAllUsersError.throw()).toBe(true);
      });
    });
  });
});

describe('AddMemberAction', () => {
  let mockAxios;
  let dispatchSpy;
  const addMemberResponse = {
    response: 'Add member successfully'
  };
  beforeEach(() => {
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
        memberId: 'SUL5pAUsQmV3FxNQXIb9hXFbI8h2' };
      addMember(memberDetails).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('ADD_MEMBER');
      });
    });
  });
});

describe('Test for AddMemberAction Error', () => {
  let mockAddMemberError;
  const error = {
    response: {
      data: {
        error: 'User`s already a member'
      }
    }
  };
  beforeEach(() => {
    mockAddMemberError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(error));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for addMember Method Error', () => {
    it('should not dispatch an action', () => {
      expect(addMember).toBeDefined();
    });

    it('should dispatch an action', () => {
      const memberDetails = {
        groupId: '-KwZyowDPR6PAQmGIRcw',
        memberId: 'SUL5pAUsQmV3FxNQXIb9hXFbI8h2'
      };
      addMember(memberDetails).catch(() => {
        expect(mockAddMemberError.throw()).toBe(true);
      });
    });
  });
});
