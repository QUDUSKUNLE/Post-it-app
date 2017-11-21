import expect from 'expect';
import SignInStore from '../../src/stores/SignInStore.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import signInResponse from '../../src/__mock__/signInResponse.json';
import mockData from '../../src/__mock__/mockData';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/SignInStore.js');

describe('SignIn Store', () => {
  describe('Test for signInUser method', () => {
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
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'SIGN_IN_SUCCESS', response });
      expect(SignInStore.signInUser()).toEqual(response);
    });
    it('should return an empty object on first call', () => {
      expect(SignInStore.signInUser()).toEqual({});
    });
  });
});

describe('SignIn Store', () => {
  describe('Test for passwordReset method', () => {
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
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'PASSWORD_RESET_SUCCESS', response });
      expect(SignInStore.passwordReset()).toEqual(response);
    });
    it('should be registered to AppDispatcher', () => {
      expect(SignInStore.passwordReset()).toEqual({});
    });
  });
});


describe('SignIn Store', () => {
  describe('Test for googleSignIn method', () => {
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
    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'GOOGLE_SIGN_IN_SUCCESS', response });
      expect(SignInStore.googleSignIn()).toEqual(response);
    });
    it('should be registered to AppDispatcher', () => {
      expect(SignInStore.googleSignIn()).toEqual({});
    });
  });
});
