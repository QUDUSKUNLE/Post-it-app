import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import '../../src/__mock__/firebaseMock.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import { signInAction, signInWithGoogle }
  from '../../src/actions/signInActions.js';
import signOutAction from '../../src/actions/signOutActions.js';

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
    it('should dispatch an action', () =>
      signInAction(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_IN_SUCCESS');
      })
    );
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
    it('should dispatch GOOGLE_SIGN_IN_SUCCESS', () => {
      signInWithGoogle(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(
          'GOOGLE_SIGN_IN_SUCCESS');
      });
    });
  });
});

describe('signOutAction', () => {
  let mockAxios;
  const signOutResponse = {
    message: 'User`s signed-out successfully'
  };

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve(signOutResponse));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signOutAction', () => {
    it('should signout user successfully', () => {
      signOutAction().then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toEqual(signOutResponse);
          expect(res).toBeInstanceOf(Object);
        });
      });
    });
  });
});

