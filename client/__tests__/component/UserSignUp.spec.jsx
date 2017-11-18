import React from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import UserSignUp from '../../src/components/UserSignUp';

describe('<UserSignUp/>', () => {
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
  const wrapper = mount(<UserSignUp {...props} />,
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

  it('component should be defined', () => {
    expect(UserSignUp).toBeDefined();
  });

  it('component should have signup form', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
  });

  it('component should call componentDidMount', () => {
    expect(UserSignUp.prototype.componentDidMount.calledOnce).toEqual(true);
    UserSignUp.prototype.componentDidMount.restore();
  });

  it('component should called onSubmit method when submit button is clicked',
  () => {
    wrapper.find('form').simulate('submit');
    expect(UserSignUp.prototype.onSubmit.calledOnce).toEqual(true);
  });

  it('onChange method should be called while typing in the input field', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });

  it('componentWillUnmount component lifecycle to be unmounted when called',
  () => {
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
});
