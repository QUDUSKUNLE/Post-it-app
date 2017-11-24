import expect from 'expect';
import SignInStore from '../../src/stores/SignInStore.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import mockData from '../../src/__mock__/mockData';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/SignInStore.js');

describe('SignIn Store', () => {
  // signInUser method
  describe('signInUser method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = signInResponse;
    });
    afterEach(() => {
      SignInStore.handleActions({
        type: 'SIGN_IN_SUCCESS', response: {}
      });
    });
    it(`should return response when SIGN_IN_SUCCESS action type is
     dispatched to the store`, () => {
      AppDispatcherMock({ type: 'SIGN_IN_SUCCESS', response });
      expect(SignInStore.signInUser()).toEqual(response);
    });
    it('should return an empty object on first call', () => {
      expect(SignInStore.signInUser()).toEqual({});
    });
  });

// passwordReset method
  describe('passwordReset method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockData.signInStorePasswordReset;
    });
    afterEach(() => {
      SignInStore.handleActions({
        type: 'PASSWORD_RESET_SUCCESS', response: {}
      });
    });
    it(`should return response when action SIGN_UP_SUCCESS action is dispatched
     to the store`, () => {
      AppDispatcherMock({ type: 'PASSWORD_RESET_SUCCESS', response });
      expect(SignInStore.passwordReset()).toEqual(response);
    });
    it(`should return an empty object on first call when no action is
     dispatched to SignInStore`, () => {
      expect(SignInStore.passwordReset()).toEqual({});
    });
  });

// googleSignIn method
  describe('googleSignIn method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockData.signInStoreGoogleSignIn;
    });
    afterEach(() => {
      SignInStore.handleActions({
        type: 'GOOGLE_SIGN_IN_SUCCESS', response: {}
      });
    });
    it(`should return response when action GOOGLE_SIGN_IN_SUCCESS action is
     dispatched to SignInstore`, () => {
      AppDispatcherMock({ type: 'GOOGLE_SIGN_IN_SUCCESS', response });
      expect(SignInStore.googleSignIn()).toEqual(response);
    });
    it(`should return an empty object on first call when no action is
     dispatched to SignInStore`, () => {
      expect(SignInStore.googleSignIn()).toEqual({});
    });
  });
});
