import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import signInResponse from '../../src/__mock__/signInResponse.json';
import mockData from '../../src/__mock__/mockData';
import { signInAction, signInWithGoogle }
  from '../../src/actions/signInAction';
import signOutAction from '../../src/actions/signOutAction';

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
    it('should dispatch an action', () =>
      signInAction(mockData.user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_IN_SUCCESS');
      })
    );
  });
});

describe('SignInAction Error', () => {
  let mockAxiosError;

  beforeEach(() => {
    mockAxiosError = sinon.stub(axios, 'post').callsFake(() =>
      Promise.reject(mockData.signInActionError));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signInAction Method', () => {
    it('should error with invalid sign in details', () =>
      signInAction(mockData.user).catch(() => {
        expect(mockAxiosError.throw()).toBe(true);
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
    it('should dispatch GOOGLE_SIGN_IN_SUCCESS', () => {
      signInWithGoogle(mockData.user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe(
          'GOOGLE_SIGN_IN_SUCCESS');
      });
    });
  });
});

describe('GoogleSignIn Error', () => {
  let mockGoogleSignInError;

  beforeEach(() => {
    mockGoogleSignInError = sinon.stub(axios, 'post').callsFake(() => (
      Promise.reject(mockData.googleSignInError)));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signInWithGoogle Method', () => {
    it('should throw error for wrong signin details', () => {
      signInWithGoogle(mockData.user).catch(() => {
        expect(mockGoogleSignInError.throw()).toBe(true);
      });
    });
  });
});

describe('signOutAction', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve(mockData.signOutResponse));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signOutAction', () => {
    it('should signout user successfully', () => {
      signOutAction().then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toEqual(mockData.signOutResponse);
          expect(res).toBeInstanceOf(Object);
        });
      });
    });
  });
});
