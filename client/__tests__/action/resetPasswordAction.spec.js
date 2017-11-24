import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import '../../src/__mock__/firebaseMock.js';
import mockData from '../../src/__mock__/mockData';
import resetPasswordAction from '../../src/actions/resetPasswordAction';

describe('ResetPassword action', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve(mockData.resetResponse));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  it(`should dispatch an action PASSWORD_RESET_SUCCESS on success
   of resetPassword action`, () => {
    resetPasswordAction(mockData.mail).then(() => {
      expect(mockAxios.calledOnce).toBe(true);
      expect(dispatchSpy.calledOnce).toEqual(true);
      expect(dispatchSpy.getCall(0).args[0].type)
        .toBe('PASSWORD_RESET_SUCCESS');
    });
  });
});

describe('ResetPassword cction', () => {
  let mockResetPasswordError;
  beforeEach(() => {
    mockResetPasswordError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(mockData.resetPasswordError));
  });

  afterEach(() => {
    axios.post.restore();
  });

  it(`should throw error when a wrong email address is passed to
   the resetPassword action`, () => {
    resetPasswordAction(mockData.email).catch(() => {
      expect(mockResetPasswordError.throw()).toBe(true);
    });
  });
});
