import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../../client/src/js/components/userSignUp.jsx';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(SignUp).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<SignUp/>);
    expect(component).toMatchSnapshot();
  });
});