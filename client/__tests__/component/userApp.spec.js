import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserApp from '../../src/components/UserApp.jsx';
import UserSignUp from '../../src/components/UserSignUp.jsx';

describe('UserApp component', () => {
  it('expected to be defined', () => {
    expect(UserApp).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<UserApp/>);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const component = shallow(<UserSignUp/>);
    expect(component).toMatchSnapshot();
  });
  it('should render without crashing', () => {
    const component = shallow(<UserApp/>);
    expect(component.find('.mainbody').exists()).toBeTruthy();
    expect(component.find('.home').exists()).toBeTruthy();
    expect(component.find('div')).toHaveLength(3);
    expect(component.find('h4')).toHaveLength(1);
    expect(component.find('small')).toHaveLength(1);
    expect(component.find('i')).toHaveLength(1);
    expect(component.find('UserSignUp')).toHaveLength(1);
  });
});
