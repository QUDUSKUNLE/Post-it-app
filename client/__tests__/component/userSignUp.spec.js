import React from 'react';
import { shallow } from 'enzyme';
// import { expect } from 'chai';
import UserSignUp from '../../src/components/UserSignUp';

describe('PostIt-app', () => {
  it('expects Sign in component to be defined', () => {
    expect(UserSignUp).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<UserSignUp/>);
    expect(component).toMatchSnapshot();
  });
});
