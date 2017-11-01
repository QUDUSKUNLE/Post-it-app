import React from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import UserResetPassword
  from '../../src/components/UserResetPassword';
import '../../../server/config/dbConfig';
import SignInStore from '../../src/stores/SignInStore';

describe('UserResetPassword component', () => {
  let wrapper;
  beforeEach(() => {
    const res = { response: 'Password reset email sent successfully!' };
    SignInStore.passwordReset = jest.fn(() => res);

    const props = {
      email: '',
    };

    wrapper = mount(<UserResetPassword {...props}/>,
      {
        childContextTypes: { router: PropTypes.object },
        context: {
          router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/passwordreset',
              component: '[function UserResetPassword]',
              location: {
                pathname: '/passwordreset',
                search: '',
                hash: '',
                key: 'zo06fn'
              },
              computedMatch: {
                path: '/passwordreset',
                url: '/passwordreset',
                isExact: true,
                params: {}
              }
            }
          }
        }
      }
    );
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().email).toEqual('');
  });
  it('should be defined', () => {
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
    expect(component.find('Link')).toHaveLength(4);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component.find('input.signinform')).toHaveLength(1);
  });
  it('should call onChange method', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
  it('should call onSubmit method', () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state().email).toEqual('');
  });
  it('should componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserResetPassword.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserResetPassword.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('sets state when handlePasswordReset method is called', () => {
    expect(wrapper.node.state).toEqual({ email: '' });
    wrapper.instance().handlePasswordReset();
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
    expect(wrapper.nodes[0].handlePasswordReset).toBeDefined();
  });
  it('should redirect to another page on click of a button', () => {
    wrapper.find(Link).at(2).simulate('click');
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/');
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/signin');
    expect(wrapper.find(Link).at(3).prop('to')).toEqual('/passwordreset');
  });
});
