import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import 'babel-polyfill';
import firebase from '../../src/vendors/index';
import localStorageMock from '../../src/__mock__/localStorage';
import axiosMock from '../../src/__mock__/axiosMock.jsx';
import Footer from '../../src/components/Footer';
import { signInAction } from '../../src/actions/SignInActions';
import UserSignIn from '../../src/components/UserSignIn';
import SignInStore from '../../src/stores/SignInStore';
import signInResponse from '../../src/__mock__/signInResponse.json';


window.localStorage = localStorageMock;
// jest.mock('../../src/vendors/index.js', () => {
//   /**
//    * @description describes a function that mocks firebase module,
//    * fires it action to make an Api call, returns a promise that is mocked
//    *
//    * @param { void } void takes no parameter
//    *
//    * @return { object } mockfirebase object
//    *
//    * @function Test
//    */
//   function Test() {

//   }
//   const mockFirebase = jest.fn().mockReturnValue({
//     signInWithPopup: jest.fn().mockReturnValue(Promise.resolve({
//       user: 'testUser'
//     }))
//   });
//   Test.prototype.addScope = jest.fn();
//   mockFirebase.GoogleAuthProvider = Test;
//   return {
//     auth: mockFirebase,
//   };
// });

describe('UserSignIn component', () => {
  let component;
  let wrapper;
  const mockOnSignIn = sinon.stub(SignInStore,
    'on').callsFake((user, cb) => cb());
  const mockUnMountSignIn = sinon.stub(SignInStore,
    'removeListener').callsFake((user, cb) => cb());
  const mockSignInResponse = sinon.stub(SignInStore,
    'signInUser').returns(signInResponse);
  // let axiosMock;
  // const onSubmitSpy = sinon.spy();
  // const signInActionSpy = signInAction;
  beforeEach(() => {
    // axiosMock = mockApiCall;
    // jest.mock('axios', () => axiosMock);
    // SignInStore.signInUser = jest.fn(() => signInResponse);
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
  it('expects UserSignUp component to be defined', () => {
    expect(UserSignIn).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('div').length).toBe(15);
  });
  // it('should have an empty initial state', () => {
  //   console.log(component);
  //   // expect(wrapper.state()).toBeDefined();
  //   // expect(wrapper.state().userName).toEqual('');
  //   // expect(wrapper.state().userId).toEqual('');
  //   // expect(wrapper.state().email).toEqual('');
  //   // expect(wrapper.state().password).toEqual('');
  // });

  // it('should contain <Footer/>', () => {
  //   expect(wrapper.find(Footer).root.length).toEqual(1);
  //   expect(wrapper.find('form').length).toEqual(1);
  // });

  // it('should contain defined methods', () => {
  //   expect(wrapper.nodes[0].onChange).toBeDefined();
  //   expect(wrapper.nodes[0].onSubmit).toBeDefined();
  //   expect(wrapper.nodes[0].handleSignInAction).toBeDefined();
  //   expect(wrapper.nodes[0].googleSignIn).toBeDefined();
  //   expect(wrapper.nodes[0].handleGoogleEvent).toBeDefined();
  // });

  // it('It should call onChange method', () => {
  //   // const event = { target: { name: 'name', value: 'value' } };
  //   // wrapper.instance().onChange(event);
  //   // expect(wrapper.state().name).toEqual('value');
  // });
  // it('should call onSubmit method', () => {
  //   wrapper.instance().onSubmit({ preventDefault() {} });
  //   expect(wrapper.state().email).toEqual('');
  // });
  // it('should componentDidMount component lifecycle', () => {
  //   const spy = sinon.spy(UserSignIn.prototype, 'componentDidMount');
  //   wrapper.instance().componentDidMount();
  //   expect(spy.calledOnce).toBeTruthy();
  // });

  // it('should call componentWillUnmount component lifecycle', () => {
  //   const spy = sinon.spy(UserSignIn.prototype, 'componentWillUnmount');
  //   wrapper.instance().componentWillUnmount();
  //   expect(spy.calledOnce).toBeTruthy();
  // });
  // it('should find a link', () => {
  //   console.log(wrapper);
  //   // expect(wrapper.find(Link).at(2).prop('to')).toEqual('/signin');
  //   // expect(wrapper.find(Link).at(3).prop('to')).toEqual('/passwordreset');
  //   // expect(wrapper.find(Link).at(4).prop('to')).toEqual('/');
  // });

  // it('should render correctly', () => {
  //   expect(component).toMatchSnapshot();
  //   expect(component.find('form')).toHaveLength(1);
  //   expect(component.find('input')).toHaveLength(2);
  //   expect(component.find('input.signinform')).toHaveLength(2);
  // });
  // it('should contain a google button', () => {
  //   wrapper.find(GoogleButton).simulate('click');
  //   expect(firebase.auth.GoogleAuthProvider.prototype.addScope)
  //     .toHaveBeenCalledTimes(1);
  //   expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
  // });
  // it('should take props', () => {
  //   expect(wrapper.props().onChange).toBeTruthy();
  //   expect(wrapper.props().onClick).toBeTruthy();
  //   expect(wrapper.props().handleSignInAction).toBeTruthy();
  //   expect(wrapper.props().handleGoogleEvent).toBeTruthy();
  // });
});


// describe('<UserSignIn />', () => {
//   const signInActionSpy = signInAction;
//   it('simulates click events', () => {
//     const onSubmitSpy = sinon.spy();
//     const component = shallow(<UserSignIn onSubmitSpy={signInActionSpy}/>);
//     component.find('#signinformbtn').simulate('click');
//     expect(component.props.onSubmitSpy).toHaveBeenCalled();
//   });
// });

