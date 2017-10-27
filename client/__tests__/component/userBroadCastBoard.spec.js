import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserBroadCastBoard from '../../src/components/UserBroadCastBoard';

describe('PostIt-app', () => {
  it('expects BroadcastBoard component to be defined', () => {
    expect(UserBroadCastBoard).toBeDefined();
  });
});
