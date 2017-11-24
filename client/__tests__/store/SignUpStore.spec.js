import expect from 'expect';
import SignUpStore from '../../src/stores/SignUpStore.js';
import AppDispatcher from '../../src/dispatcher/AppDispatcher.js';
import mockData from '../../src/__mock__/mockData';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/SignUpStore.js');

describe('SignUp Store', () => {
  describe('signUpUser method', () => {
    let response;
    let AppDispatcherMock;
    beforeEach(() => {
      AppDispatcherMock = AppDispatcher.register.mock.calls[0][0];
      response = mockData.signUpMockData;
    });

    afterEach(() => {
      SignUpStore.handleSignUpActions({
        type: 'SIGN_UP_SUCCESS', response: {}
      });
    });

    it(`should return response when action SIGN_UP_SUCCESS action is dispatched
     to the store`, () => {
      AppDispatcherMock({ type: 'SIGN_UP_SUCCESS', response });
      expect(SignUpStore.signUpUser()).toEqual(response);
    });
    it('should return an empty object on first call', () => {
      expect(SignUpStore.signUpUser()).toEqual({});
    });
  });
});
