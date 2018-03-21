import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import signUpResponse from '../../src/__mock__/signUpResponse.json';
import mockData from '../../src/__mock__/mockData';
import signUpAction from '../../src/actions/signUpAction';

describe('signUp action', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ signUpResponse }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  it('should dispatch SIGN_UP_SUCCESS action on successful sign up', () => {
    signUpAction(mockData.signUpUser).then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.calledOnce).toEqual(true);
      expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_UP_SUCCESS');
    });
  });
});


describe('signUp action', () => {
  let mockAxiosError;

  beforeEach(() => {
    mockAxiosError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(mockData.signUpActionError));
  });

  afterEach(() => {
    axios.post.restore();
  });

  it('should throw error for sign up with incorrect sign up details', () => {
    signUpAction(mockData.signUpUser).catch(() => {
      mockAxiosError.threw().should.be.true();
    });
  });
});
