import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import groupResponse from '../../src/__mock__/groupResponse.json';
import mockData from '../../src/__mock__/mockData';
import { getUserGroups, createGroup }
  from '../../src/actions/groupAction';


describe('getUserGroups action', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve({ groupResponse }));
    if (groupResponse.response[0] === null) {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    } else {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    }
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  it('is expected to be defined', () => {
    expect(getUserGroups).toBeDefined();
  });
  it('should dispatch an action GET_USER_GROUPS', () => {
    getUserGroups().then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_USER_GROUP');
    });
  });
});


describe('createGroup action', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() => (
      Promise.resolve({ groupResponse })
    ));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  it('is expected to be defined', () => {
    expect(createGroup).toBeDefined();
  });
  it(`should dispatch an action CREATE_GROUP when createGroup
   action is called`, () => {
    createGroup(mockData.groupName).then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe('CREATE_GROUP');
    });
  });
});

describe('createGroup action', () => {
  let mockCreatGroupError;
  beforeEach(() => {
    mockCreatGroupError = sinon.stub(axios, 'post').callsFake(() => (
      Promise.reject(mockData.groupActionError)
    ));
  });

  afterEach(() => {
    axios.post.restore();
  });

  it('expects error to be thrown when no group is created', () => {
    createGroup(mockData.groupName).catch(() => {
      expect(mockCreatGroupError.throw()).toBe(true);
    });
  });
});

