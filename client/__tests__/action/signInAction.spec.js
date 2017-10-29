import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import { signinAction, signInWithGoogle }
  from '../../src/actions/signInActions';
import { signoutAction } from '../../src/actions/signOutActions';

describe('SignInAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ signInResponse }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for signInAction Method', () => {
    const user = { email: 'quduskunle@gmail.com', password: 'Ka123@' };
    it('should dispatch an action', () => {
      return signinAction(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toEqual({ signInResponse });
          expect(res).toBeInstanceOf(Object);
        });
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_IN_SUCCESS');
      });
    });
  });
});


describe('GoogleSignIn', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() => (
      Promise.resolve({ signInResponse })
    ));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for signInWithGoogle Method', () => {
    const user = { email: 'quduskunle@gmail.com', password: 'Ka123@' };
    it('should dispatch an action', () => {
      signInWithGoogle(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('GOOGLE_SIGN_IN_SUCCESS');
      });
    });
  });
});

describe('signoutAction', () => {
  let mockAxios;

  beforeEach(() => {
    const signOutResponse = {
      message: 'User`s signed-out successfully'
    };
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve(signOutResponse));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signoutAction', () => {
    it('should signout user successfully', () => {
      signoutAction().then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          const signOutResponse = {
            message: 'User`s signed-out successfully'
          };
          expect(res).toEqual(signOutResponse);
          expect(res).toBeInstanceOf(Object);
        });
      });
    });
  });
});

