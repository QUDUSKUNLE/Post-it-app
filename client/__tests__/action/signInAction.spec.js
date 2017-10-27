import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import signInError from '../../src/__mock__/signInError.json';
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


describe('SignInAction resolves error', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    const error = signInError.response;
    mockAxios = sinon.stub(axios, 'post').callsFake(() => {
      if (error) {
        return Promise.reject(error);
      }
    });
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for signInAction Method', () => {
    it('should dispatch an action', () => {
      const user = { email: 'quduskunle@gmail.com', password: 'Ka12' };
      const error = signInError.response;
      signinAction(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.catch((err) => {
          expect(err).toEqual(error);
          expect(err).toBeInstanceOf(Object);
        });
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type)
          .toBe('SIGN_IN_ERROR');
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

  // describe('Test for signInWithGoogle Method', () => {
  //   const user = { email: 'quduskunle@gmail.com', password: 'Ka1' };
  //   it('should dispatch an action', () => {
  //     signInWithGoogle(user).catch((error) => {
  //       expect(mockAxios.calledOnce).toBe(true);
  //       expect(dispatchSpy.calledOnce).toEqual(true);
  //       AppDispatcher.dispatch({
  //         type: 'GOOGLE_SIGN_IN_ERROR',
  //         response: error
  //       });
  //       expect(dispatchSpy.getCall(0).args[0].type).toBe('GOOGLE_SIGN_IN_ERRO');
  //     });
  //   });
  // });
});


// describe('SignInAction Error', () => {
//   let mockAxios;
//   let dispatchSpy;

//   beforeEach(() => {
//     mockAxios = sinon.stub(axios, 'post').resolves(() => {
//       if (signInError.response) {
//         console.log(signInError.response);
//         return signInError.response;
//       }
//     });
//     dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
//   });

//   afterEach(() => {
//     axios.post.restore();
//     AppDispatcher.dispatch.restore();
//   });

//   describe('Test for signInAction Method', () => {
//     it('should dispatch an action', () => {
//       const user = { email: 'quduskunle@gmail.com', password: 'Ka12' };
//       return signinAction(user).then((error) => {
//         console.log(error);
//         // expect(mockAxios.calledOnce).toBe(true);
//         // mockAxios.getCall(0).returnValue.then((res) => {
//         //   expect(res).toEqual({ signInResponse });
//         //   expect(res).toBeInstanceOf(Object);
//         // });
//         // expect(dispatchSpy.calledOnce).toEqual(true);
//         // expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_IN_SUCCESS');
//       });
//       // mockAxios.rejects({ signInError });
//       // return signinAction(user).then(() => {
//       //   mockAxios.getCall(0).returnValue.catch((error) => {
//       //     console.log(error);
//       //   });
//       // });
//     });
//   });
// });

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

