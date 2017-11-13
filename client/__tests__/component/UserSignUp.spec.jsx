import React from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import UserSignUp from '../../src/components/UserSignUp.jsx';

describe('PostIt-app', () => {
  const signUpAction = sinon.spy();
  sinon.spy(UserSignUp.prototype, 'onSubmit');
  sinon.spy(UserSignUp.prototype, 'componentDidMount');
  const spy = sinon.spy(UserSignUp.prototype, 'componentWillUnmount');
  const props = {
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    phoneNumber: '',
    signUpAction
  };
  const wrapper = mount(<UserSignUp {...props}/>,
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
    }
  );

  it('expects UserSignUp component to be defined', () => {
    expect(UserSignUp).toBeDefined();
  });

  it('should have signup form', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });

  it('calls componentDidMount', () => {
    expect(UserSignUp.prototype.componentDidMount.calledOnce).toEqual(true);
    UserSignUp.prototype.componentDidMount.restore();
  });

  it('should called onSubmit method when submit button is clicked', () => {
    wrapper.find('form').simulate('submit');
    expect(UserSignUp.prototype.onSubmit.calledOnce).toEqual(true);
  });

  it('should call onChange method when type something in the input', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });

  it('expects componentWillUnmount to be unmounted', () => {
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
});
