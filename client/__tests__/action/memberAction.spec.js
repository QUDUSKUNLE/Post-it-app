import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import memberResponse from '../../src/__mock__/memberResponse.json';
import mockData from '../../src/__mock__/mockData';
import { getGroupMember, addMember }
  from '../../src/actions/memberAction';

describe('getGroupMembers action', () => {
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

  it(`should dispatch an action GET_MEMBERS_OF_GROUP on
   success of getGroupMembers`, () => {
    getGroupMember(mockData.groupId).then(() => {
      expect(mockGetGroupMembers.calledOnce).toBe(true);
      expect(dispatchSpy.calledOnce).toEqual(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe(
        'GET_MEMBERS_OF_GROUP');
    });
  });
});

describe('AddMember action', () => {
  let mockAxios;
  let dispatchSpy;
  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve(mockData.addMemberResponse));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  it('is expected to be defined', () => {
    expect(addMember).toBeDefined();
  });

  it(`should dispatch an action ADD_MEMBER on successfully add member
   to a group`, () => {
    addMember(mockData.memberDetails).then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.calledOnce).toEqual(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe('ADD_MEMBER');
    });
  });
});

describe('AddMember action', () => {
  let mockAddMemberError;
  beforeEach(() => {
    mockAddMemberError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(mockData.memberActionError));
  });

  afterEach(() => {
    axios.post.restore();
  });

  it(`expects error to be thrown when no member is added to a
   group successfully`, () => {
    addMember(mockData.memberDetails).catch(() => {
      expect(mockAddMemberError.throw()).toBe(true);
    });
  });
});
