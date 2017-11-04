import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import 'babel-polyfill';
import localStorageMock from '../../src/__mock__/localStorage';
import axiosMock from '../../src/__mock__/axiosMock.jsx';
import Footer from '../../src/components/Footer';
import { signInAction } from '../../src/actions/SignInActions';
import UserSignIn from '../../src/components/UserSignIn';
import SignInStore from '../../src/stores/SignInStore';
import signInResponse from '../../src/__mock__/signInResponse.json';


window.localStorage = localStorageMock;
describe('<UserSignIn/>', () => {
  let component;
  let wrapper;
  const mockOnSignIn = sinon.stub(SignInStore,
    'on').callsFake((user, cb) => cb());
  const mockUnMountSignIn = sinon.stub(SignInStore,
    'removeListener').callsFake((user, cb) => cb());
  const mockSignInResponse = sinon.stub(SignInStore,
    'signInUser').returns(signInResponse);
  beforeEach(() => {
    const props = {
      userName: '',
      userId: '',
      email: '',
      password: '',
      loggeddIn: false,
      isLoading: false
    };
    component = shallow(<UserSignIn {...props}/>);
    wrapper = mount(<UserSignIn {...props}/>,
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
  });
  it('component to be defined', () => {
    expect(UserSignIn).toBeDefined();
  });
  it('component should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('div').length).toBe(9);
  });
});

