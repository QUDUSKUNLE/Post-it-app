import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import groupResponse from '../../src/__mock__/groupResponse.json';
import { getUserGroups, createGroup }
  from '../../src/actions/GroupActions';


describe('groupActions', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve({ groupResponse }));
    if (groupResponse.response[0] !== null) {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    } else {
      dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
    }
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getUserGroups Method', () => {
    it('should dispatch an action', () => {
      expect(getUserGroups).toBeDefined();
    });
    it('should dispatch an action', () => {
      const userId = 'NCaAzr0ZzqfCLtXQlQG0jW2DWbg1';
      getUserGroups(userId).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ groupResponse });
        });
        expect(dispatchSpy.called).toEqual(false);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_USER_GROUP');
      });
    });
  });
});


describe('groupActions', () => {
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

  describe('Test for createGroup Method', () => {
    it('should dispatch an action', () => {
      expect(createGroup).toBeDefined();
    });
    it('should dispatch an action', () => {
      const groupName = { group: 'andelauuuuu' };
      createGroup(groupName).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ groupResponse });
        });
        expect(dispatchSpy.getCall(0).args[0].type).toBe('CREATE_GROUP');
      });
    });
  });
});
