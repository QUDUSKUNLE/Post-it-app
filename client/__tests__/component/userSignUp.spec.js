import React from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import { Link } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import signUpResponse from '../../src/__mock__/signUpResponse.json';
import SignUpStore from '../../src/stores/SignUpStore';
import UserSignUp from '../../src/components/UserSignUp';

describe('PostIt-app', () => {
  let wrapper;
  let component;
  const mockOnSignUp = sinon.stub(SignUpStore,
    'on').callsFake((signUp, cb) => cb());
  const mockUnMountSignUp = sinon.stub(SignUpStore,
    'removeListener').callsFake((signUp, cb) => cb());
  const mockSignUpResponse = sinon.stub(SignUpStore,
    'signUpUser').returns('Adekunle');

  beforeEach(() => {
    const props = {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      confirmPassword: ''
    };
    component = shallow(<UserSignUp {...props}/>);
    wrapper = mount(<UserSignUp {...props}/>,
      {
        childContextTypes: { router: PropTypes.object },
        context: {
          router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/',
              component: '[function UserSignUp]',
              location: {
                pathname: '/',
                search: '',
                hash: '',
                key: '6l9jpq'
              },
              computedMatch: {
                path: '/',
                url: '/',
                isExact: true,
                params: {}
              }
            }
          }
        }
      });
  });
  it('expects UserSignUp component to be defined', () => {
    expect(UserSignUp).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('div').length).toBe(10);
  });
  // it('should call onChange', () => {
  //   const event = { target: { name: 'name', value: 'value' } };
  //   wrapper.instance().onChange(event);
  //   expect(wrapper.state().name).toEqual('value');
  // });
  // it('should find a link', () => {
  //   console.log(component);
  //   // expect(component.find(Link).at(1).prop('to')).toEqual('/broadcastboard');
  //   // expect(component.find(Link).at(2).prop('to')).toEqual('/member');
  // });
  // it('should call onSubmit', () => {
  //   // wrapper.instance().onSubmit({ preventDefault() {} });
  //   console.log(wrapper.state().email);
  //   // expect(wrapper.state().username).toEqual('');
  //   // expect(wrapper.state().password).toEqual('');
  //   // expect(wrapper.state().confirmPassword).toEqual('');
  //   // expect(wrapper.state().phoneNumber).toEqual('');
  // });
  // it('check if component is being called', () => {
  //   // expect(mockOnSignUp.displayName).toEqual('on');
  //   // console.log(mockOnSignUp.callCount);
  //   // console.log(wrapper.state());
  // });
});
