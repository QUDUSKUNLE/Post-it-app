import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../../src/components/Home';
import UserSignUp from '../../src/components/UserSignUp';


describe('<Home/>', () => {
  it('component expected to be defined', () => {
    expect(Home).toBeDefined();
  });

  it('component should render correctly', () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
    expect(component.find(UserSignUp)).toHaveLength(1);
    expect(component.find('div')).toHaveLength(5);
  });
});
