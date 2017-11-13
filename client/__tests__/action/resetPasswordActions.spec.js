import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import '../../src/__mock__/firebaseMock.js';
import resetPassword from '../../src/actions/resetPasswordActions.js';

describe('resetPasswordAction', () => {
  let mockAxios;
  let dispatchSpy;
  const resetResponse = {
    message: 'Password reset email sent successfully!'
  };

  beforeEach(() => {
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
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('PASSWORD_RESET_' +
         'SUCCESS');
      });
    });
  });
});

describe('resetPasswordAction', () => {
  let mockResetPasswordError;
  const error = {
    response:
    {
      data:
      {
        error:
        { message: 'Invalid email address' }
      }
    }
  };

  beforeEach(() => {
    mockResetPasswordError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(error));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for resetPasswordAction Method', () => {
    it('should throw error for a wrong email address', () => {
      const mail = { email: 'qudusgmail.com' };
      resetPassword(mail).catch(() => {
        expect(mockResetPasswordError.throw()).toBe(true);
      });
    });
  });
});
