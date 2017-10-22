import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import UserSignIn from '../../src/components/UserSignIn';


describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(UserSignIn).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<UserSignIn/>);
    expect(component).toMatchSnapshot();
  });
});

describe('PostIt-app', () => {
  it('should render correctly', () => {
    const component = shallow(<UserSignIn/>);
    expect(component).toMatchSnapshot();
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(2);
    expect(component.find('input.signinform')).toHaveLength(2);
    component.instance().componentDidMount();
  });
  it('simulates click events', () => {
    const googleSignIn = sinon.spy();
    const wrapper = shallow(
    <UserSignIn onClick={googleSignIn}/>);
    wrapper.find('GoogleButton').simulate('click');
    expect(wrapper.find('GoogleButton').exists()).toBeTruthy();
    expect(wrapper.find('GoogleButton')).toHaveLength(1);
  });

  // it('It should call onChange method', () => {
  //   const event = { target: { name: 'name', value: 'value' } };
  //   const wrapper = mount(<UserSignIn />);
  //   wrapper.instance().onChange(event);
  //   expect(wrapper.state().name).toEqual('value');
  // });
});
