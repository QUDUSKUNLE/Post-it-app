import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'expect';
import UserChatBox from '../../src/components/UserChatBox.jsx';


describe('UserChatBox', () => {
  it('component expects to be defined', () => {
    expect(UserChatBox).toBeDefined();
  });
});
