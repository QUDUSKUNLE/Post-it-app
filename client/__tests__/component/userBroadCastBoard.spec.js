import React from 'react';
import { shallow } from 'enzyme';
import BroadCastBoard from '../../client/src/js/components/userBroadCastBoard.jsx';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(BroadCastBoard).toBeDefined();
  });
});
