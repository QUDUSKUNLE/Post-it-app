import Helper from '../helper/helper';
import expect from 'expect';
import 'babel-polyfill';
import AllUsers from '../../client/src/__mock__/registeredUsers.json';

describe('Helper.getAllUsers', () => {
  it('helps to destructure array of Object coming from Firebase', () => {
    expect(Helper.getAllUsers(AllUsers)).toBeInstanceOf(Object);
  });
});
