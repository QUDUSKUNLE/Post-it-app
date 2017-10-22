import sinon from 'sinon';
import axios from 'axios';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import signInError from '../../src/__mock__/signInError.json';
import { signinAction, signInWithGoogle }
  from '../../src/actions/signInActions';

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
      signinAction(user).then(() => {
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


// describe('SignInAction', () => {
//   let mockAxios;
//   let dispatchSpy;

//   beforeEach(() => {
//     mockAxios = sinon.stub(axios, 'post').callsFake(() =>
//       Promise.resolve({ signInError }));
//     if (signInError.error) {
//       dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
//     }
//   });

//   afterEach(() => {
//     axios.post.restore();
//     AppDispatcher.dispatch.restore();
//   });

//   describe('Test for signInAction Method', () => {
//     it('should dispatch an action', () => {
//       const user = { email: 'quduskunle@gmail.com', password: 'Ka12' };
//       signinAction(user)
//         .then(() => {
//           // console.log(mockAxios.getCall(0).returnValue);
//           // console.log(dispatchSpy.getCall(0).args[0].type);
//         });
//     });
//   });
// });


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
