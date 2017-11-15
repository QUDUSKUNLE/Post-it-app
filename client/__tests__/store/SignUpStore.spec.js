import expect from 'expect';
import SignUpStore from '../../src/stores/SignUpStore.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/SignUpStore.js');

describe('SignUp Store', () => {
  describe('Test for signUpUser method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = {
        message: 'Registration successful and verification' +
        ' email sent to your email'
      };
    });

    afterEach(() => {
      SignUpStore.handleSignUpActions({
        type: 'SIGN_UP_SUCCESS', response: {}
      });
    });

    it('should be registered to AppDispatcher', () => {
      AppDispatcherMock({ type: 'SIGN_UP_SUCCESS', response });
      expect(SignUpStore.signUpUser()).toEqual(response);
    });
    it('should return an empty object on first call', () => {
      expect(SignUpStore.signUpUser()).toEqual({});
    });
  });
});
