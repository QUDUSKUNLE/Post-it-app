import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import 'babel-polyfill';
import { helpGetGroupMessages } from '../../src/helper/convertObject';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';
import sendMessageResponse from '../../src/__mock__/sendMessageResponse.json';
import { getGroupMessage, sendGroupMessage }
  from '../../src/actions/messageAction';

describe('MessageActions', () => {
  let mockAxios;
  let dispatchSpy;
  const messageResponse = helpGetGroupMessages(
    groupMessageResponse.response);

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() =>
      Promise.resolve(messageResponse));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.get.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for getGroupMessage Method', () => {
    it('should dispatch an action here', () => {
      expect(getGroupMessage).toBeDefined();
    });
    it('should dispatch an action', () => {
      const groupId = '-KvIvb4PMw3w2pr9196U';
      getGroupMessage(groupId).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.called).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_GROUP_MESSAGE');
      });
    });
  });
});

describe('MessageActions', () => {
  let mockGetGroupMessageError;
  const error = {
    response: {
      data: {
        message: 'No message found'
      }
    }
  };

  beforeEach(() => {
    mockGetGroupMessageError = sinon.stub(axios, 'get').callsFake(() =>
      Promise.reject(error));
  });

  afterEach(() => {
    axios.get.restore();
  });

  describe('Test for getGroupMessage Method', () => {
    it('should throw error if no message found', () => {
      const groupId = '-KvIvb4PMw3w2pr9196U';
      getGroupMessage(groupId).catch(() => {
        expect(mockGetGroupMessageError.throw()).toBe(true);
      });
    });
  });
});

describe('MessageActions', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ sendMessageResponse }));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for sendGroupMessage Method', () => {
    it('should dispatch an action', () => {
      expect(sendGroupMessage).toBeDefined();
    });
    it('should dispatch an action', () => {
      const messageDetails = {
        message: 'Hello, User Sign in',
        priority: 'normal',
        groupId: '-KvIvb4PMw3w2pr9196U'
      };
      sendGroupMessage(messageDetails);
      expect(mockAxios.calledOnce).toBe(true);
    });
  });
});
