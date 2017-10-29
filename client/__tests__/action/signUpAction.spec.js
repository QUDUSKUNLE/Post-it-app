import sinon from 'sinon';
import axios from 'axios';
import expect from 'expect';
import AppDispatcher from '../../src/dispatcher/AppDispatcher';
import '../../src/__mock__/firebaseMock.js';
import signUpResponse from '../../src/__mock__/signUpResponse.json';
import { signupAction } from '../../src/actions/signUpActions';

describe('signupAction', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'post').callsFake(() =>
      Promise.resolve({ signUpResponse }));
    dispatchSpy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.post.restore();
    AppDispatcher.dispatch.restore();
  });

  describe('Test for signUpAction Method', () => {
    it('should dispatch an action', () => {
      const user = {
        email: 'quduskunle@gmail.com',
        password: 'Ka123@',
        confirmPassword: 'Ka123@',
        phoneNumber: '07031187445',
        userName: 'kunle' };
      return signupAction(user).then(() => {
        expect(mockAxios.calledOnce).toBe(true);
        mockAxios.getCall(0).returnValue.then((res) => {
          expect(res).toEqual({ signUpResponse });
          expect(res).toBeInstanceOf(Object);
        });
        expect(dispatchSpy.calledOnce).toEqual(true);
        expect(dispatchSpy.getCall(0).args[0].type).toBe('SIGN_UP_SUCCESS');
      });
    });
  });
});
