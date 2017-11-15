import React from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import 'babel-polyfill';
import localStorageMock from '../../src/__mock__/localStorage';
import UserSignIn from '../../src/components/UserSignIn';
import SignInStore from '../../src/stores/SignInStore';
import signInResponse from '../../src/__mock__/signInResponse.json';

window.localStorage = localStorageMock;
describe('<UserSignIn/>', () => {
  const signInAction = sinon.spy();
  sinon.spy(UserSignIn.prototype, 'onSubmit');
  sinon.spy(UserSignIn.prototype, 'componentDidMount');
  const spy = sinon.spy(UserSignIn.prototype, 'componentWillUnmount');

  const mockOnSignIn = sinon.stub(SignInStore,
    'on').callsFake((user, cb) => cb());
  const mockUnMountSignIn = sinon.stub(SignInStore,
    'removeListener').callsFake((user, cb) => cb());
  const mockSignInResponse = sinon.stub(SignInStore,
    'signInUser').returns(signInResponse);

  const props = {
    userName: '',
    userId: '',
    email: '',
    password: '',
    loggeddIn: false,
    isLoading: false,
    history: {
      push: jest.fn()
    },
    signInAction
  };
  const wrapper = mount(<UserSignIn {...props} />,
    {
      childContextTypes: { router: PropTypes.object },
      context: {
        router: {
          history: {
            push: () => '/signin',
            replace: () => null,
            createHref: () => null,
            path: '/signin',
            component: '[function UserSignIn]',
            location: {
              pathname: '/signin',
              search: '',
              hash: '',
              key: 'on2bj3'
            },
            computedMatch: {
              path: '/signin',
              url: '/signin',
              isExact: true,
              params: {}
            }
          }
        }
      }
    }
  );
  it('component to be defined', () => {
    expect(UserSignIn).toBeDefined();
  });
  it('calls componentDidMount', () => {
    expect(UserSignIn.prototype.componentDidMount.calledOnce).toEqual(true);
    UserSignIn.prototype.componentDidMount.restore();
  });
  it('should have signin form fields', () => {
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
  });
  it('should called onSubmit method when submit button is clicked', () => {
    wrapper.find('form').simulate('submit');
    expect(UserSignIn.prototype.onSubmit.calledOnce).toEqual(true);
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

