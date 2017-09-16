import React from 'react';
import { shallow } from 'enzyme';
import ChatBox from '../../client/src/js/components/userChatBox.jsx';


describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(ChatBox).toBeDefined();
  });
});
