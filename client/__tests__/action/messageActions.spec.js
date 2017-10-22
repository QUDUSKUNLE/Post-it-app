import sinon from 'sinon';
import axios from 'axios';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';
import sendMessageResponse from '../../src/__mock__/sendMessageResponse.json';
import { getGroupMessage, sendGroupMessage }
  from '../../src/actions/messageActions';


describe('MessageActions', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve({ groupMessageResponse }));
    sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getGroupMessage Method', () => {
    it('should dispatch an action', () => {
      expect(getGroupMessage).toBeDefined();
    });
    it('should dispatch an action', () => {
      const groupId = '-KvIvb4PMw3w2pr9196U';
      getGroupMessage(groupId).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ groupMessageResponse });
        });
        expect(dispatchSpy.called).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_USER_GROUP');
      });
    });
  });
});

describe('MessageActions', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ sendMessageResponse }));
    sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getGroupMessage Method', () => {
    it('should dispatch an action', () => {
      expect(sendGroupMessage).toBeDefined();
    });
    it('should dispatch an action', () => {
      const messageDetails = { message: 'Hello, World', priority: 'normal',
        groupId: '-KvIvb4PMw3w2pr9196U' };
      sendGroupMessage(messageDetails).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toBeInstanceOf(Object);
          expect(res).toEqual({ sendMessageResponse });
        });
        expect(dispatchSpy.called).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_USER_GROUP');
      });
    });
  });
});
