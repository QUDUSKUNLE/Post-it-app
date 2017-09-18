import React from 'react';
import { shallow } from 'enzyme';
import ResetPassword
  from '../../client/src/js/components/userResetPassword.jsx';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(ResetPassword).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<ResetPassword/>);
    expect(component).toMatchSnapshot();
  });
});
