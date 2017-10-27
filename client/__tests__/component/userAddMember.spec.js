import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UserAddMember from '../../src/components/UserAddMember';


describe('PostIt-app', () => {
  it('expects UserAddMember component to be defined', () => {
    expect(UserAddMember).toBeDefined();
  });
});
