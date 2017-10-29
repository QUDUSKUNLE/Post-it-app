import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import UserSignUp from '../../src/components/UserSignUp';

// import localStorageMock from '../../src/__mock__/localStorage';
// window.localStorage = localStorageMock;
// localStorageMock.signUpData = JSON.stringify({
//   email: 'quduskunle@gmail.com',
//   password: 'Ka123@',
//   username: 'kunle',
//   phoneNumber: '08052327990',
//   confirmPassword: 'Ka123@'
// });
const constProps = () => {
  const props = {
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    confirmPassword: '',
    signupAction: () => Promise.resolve(),
    SignUpStore: {}
  };
  return mount(<UserSignUp {...props}/>);
};
const wrapper = constProps();

describe('PostIt-app', () => {
  it('expects UserSignUp component to be defined', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<UserSignUp/>);
    expect(component).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('should call onChange', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
  it('should call onSubmit', () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().username).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().confirmPassword).toEqual('');
    expect(wrapper.state().phoneNumber).toEqual('');
    expect(wrapper.props().signupAction()).toBeDefined();
  });
});
