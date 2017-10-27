import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UserGroups from '../../src/components/UserGroups';

import localStorageMock from '../../src/__mock__/localStorage';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(UserGroups).toBeDefined();
  });
});
