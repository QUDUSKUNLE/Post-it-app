import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import 'babel-polyfill';
import { helpGetGroupMessages } from '../../src/helper/formatResponse';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';
import sendMessageResponse from '../../src/__mock__/sendMessageResponse.json';
import mockData from '../../src/__mock__/mockData';
import { getGroupMessage, sendGroupMessage }
  from '../../src/actions/messageAction';

describe('GetGroupMessage action', () => {
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

  it('is expected to be defined', () => {
    expect(getGroupMessage).toBeDefined();
  });
  it('should dispatch an action', () => {
    getGroupMessage(mockData.groupId).then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.called).toEqual(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_GROUP_MESSAGE');
    });
  });
});

describe('GetGroupMessage action', () => {
  let mockGetGroupMessageError;
  beforeEach(() => {
    mockGetGroupMessageError = sinon.stub(axios, 'get').callsFake(() =>
      Promise.reject(mockData.messageActionError));
  });

  afterEach(() => {
    axios.get.restore();
  });
  it('should throw error if no encoutered internal server error', () => {
    getGroupMessage(mockData.groupId).catch(() => {
      expect(mockGetGroupMessageError.throw()).toBe(true);
    });
  });
});

describe('sendGroupMessage action', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ sendMessageResponse }));
  });

  afterEach(() => {
    axios.post.restore();
  });

  it('is expected to be defined', () => {
    expect(sendGroupMessage).toBeDefined();
  });
  it('expects mockAxios to be calledOnce', () => {
    sendGroupMessage(mockData.messageDetails);
    expect(mockAxios.calledOnce).toBe(true);
  });
});
