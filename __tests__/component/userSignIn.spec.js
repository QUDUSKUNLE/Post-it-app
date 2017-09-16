import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../../client/src/js/components/userSignIn.jsx';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(SignIn).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<SignIn/>);
    expect(component).toMatchSnapshot();
  });
});