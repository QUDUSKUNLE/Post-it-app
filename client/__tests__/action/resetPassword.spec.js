import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import passwordResetError from '../../src/__mock__/passwordResetError.json';
import { resetPassword } from '../../src/actions/resetPasswordActions';

describe('resetPasswordAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    const resetResponse = {
      message: 'Password reset email sent successfully!'
    };
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ resetResponse }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for resetPasswordAction Method', () => {
    it('should dispatch an action', () => {
      const mail = { email: 'quduskunle@gmail.com' };
      resetPassword(mail).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          const resetResponse = {
            message: 'Password reset email sent successfully!' };
          expect(res).toEqual({ resetResponse });
          expect(res).toBeInstanceOf(Object);
        });
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('PASSWORD_RESET_SUCCESS');
      });
    });
  });
});


describe('resetPasswordAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() => {
      if (passwordResetError.response) {
        const error = passwordResetError.response;
        return Promise.reject({ error });
      }
    });
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for resetPasswordAction Method', () => {
    it('should dispatch an action', () => {
      const mail = { email: 'qudusk@gmail.com' };
      resetPassword(mail).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res.error).toEqual(passwordResetError.response);
          expect(res).toBeInstanceOf(Object);
        });
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type)
          .toBe('PASSWORD_RESET_ERROR');
      });
    });
  });
});
