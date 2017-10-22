import React from 'react';
import { shallow } from 'enzyme';
import UserResetPassword
  from '../../src/components/UserResetPassword';

describe('PostIt-app', () => {
  it('expects UserResetComponent component to be defined', () => {
    expect(UserResetPassword).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<UserResetPassword/>);
    expect(component).toMatchSnapshot();
    expect(component.find('nav')).toHaveLength(1);
    expect(component.find('span')).toHaveLength(4);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(2);
    expect(component.find('Link')).toHaveLength(2);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component.find('input.signinform')).toHaveLength(1);
    component.instance().componentDidMount();
    component.instance().componentWillUnmount();
  });
});
