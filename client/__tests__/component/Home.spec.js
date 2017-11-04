import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Home from '../../src/components/Home.jsx';
import UserSignUp from '../../src/components/UserSignUp.jsx';

describe('<Home />', () => {
  it('expected to be defined', () => {
    expect(Home).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<Home/>);
    expect(component).toMatchSnapshot();
  });
  it('should render without crashing and find its elements', () => {
    const component = shallow(<Home/>);
    expect(component.find('.mainbody').exists()).toBeTruthy();
    expect(component.find('.home').exists()).toBeTruthy();
    expect(component.find('div')).toHaveLength(3);
    expect(component.find('h4')).toHaveLength(1);
    expect(component.find('small')).toHaveLength(1);
    expect(component.find('i')).toHaveLength(1);
    expect(component.find('UserSignUp')).toHaveLength(1);
  });
});
