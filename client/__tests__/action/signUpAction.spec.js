import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import signUpResponse from '../../src/__mock__/signUpResponse.json';
import signUpAction from '../../src/actions/signUpAction';

describe('signUpAction', () => {
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

  describe('Test for signUpAction Method', () => {
    it('should dispatch an action', () => {
      const user = {
        email: 'quduskunle@gmail.com',
        password: 'Ka123@',
        confirmPassword: 'Ka123@',
        phoneNumber: '07031187445',
        userName: 'kunle' };
      signUpAction(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_UP_SUCCESS');
      });
    });
  });
});


describe('signUpAction error', () => {
  let mockAxiosError;
  const error = {
    response:
    {
      data:
      {
        error:
          { code: 'Password does not match' }
      }
    }
  };

  beforeEach(() => {
    mockAxiosError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(error));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signUpAction Method', () => {
    it('should dispatch an action', () => {
      const user = {
        email: 'quduskunle@gmail.com',
        password: 'Ka123@',
        confirmPassword: 'Ka123@',
        phoneNumber: '07031187445',
        userName: 'kunle'
      };
      signUpAction(user).catch(() => {
        mockAxiosError.threw().should.be.true();
      });
    });
  });
});
