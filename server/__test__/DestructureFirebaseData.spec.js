import expect from 'expect';
import 'babel-polyfill';

import DestructureFirebaseData from '../helper/DestructureFirebaseData';
import AllUsers from '../../client/src/__mock__/registeredUsers';

describe('Helper.getAllUsers', () => {
  it('helps to destructure array of Object coming from Firebase', () => {
    expect(DestructureFirebaseData.getAllUsers(AllUsers))
      .toBeInstanceOf(Object);
  });
});
