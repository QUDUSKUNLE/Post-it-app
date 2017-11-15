import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock';
import signInResponse from '../../src/__mock__/signInResponse.json';
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

describe('SignInAction Error', () => {
  let mockAxiosError;
  const error = {
    response:
    {
      data:
      {
        error:
        { message: 'Invalid signin details' }
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

  describe('Test for signInAction Method', () => {
    const user = { email: 'quduskunle@gmail.com', password: 'Ka123@' };
    it('should error with invalid sign in details', () =>
      signInAction(user).catch(() => {
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

describe('GoogleSignIn Error', () => {
  let mockGoogleSignInError;
  const error = { response: 'invalid sign in details' };

  beforeEach(() => {
    mockGoogleSignInError = sinon.stub(axios, 'post').callsFake(() => (
      Promise.reject(error)));
  });

  afterEach(() => {
    axios.post.restore();
  });

  describe('Test for signInWithGoogle Method', () => {
    const user = { email: 'quduskunle@gmail.com', password: 'Ka123@' };
    it('should throw error for wrong signin details', () => {
      signInWithGoogle(user).catch(() => {
        expect(mockGoogleSignInError.throw()).toBe(true);
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
