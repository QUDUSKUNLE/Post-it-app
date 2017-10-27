import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
// import expect from 'expect';
import Footer from '../../src/components/Footer.jsx';
import sinon from 'sinon';
import UserSignIn from '../../src/components/UserSignIn';

// import localStorageMock from '../../src/__mock__/localStorage';
// window.localStorage = localStorageMock;
// localStorageMock.signUpData = JSON.stringify({
//   email: 'quduskunle@gmail.com',
//   password: 'Ka123@',
//   username: 'kunle',
//   phoneNumber: '08052327990',
//   confirmPassword: 'Ka123@'
// });

// const constProps = () => {
//   const props = {
//     userName: '',
//     userId: '',
//     email: '',
//     password: '',
//     signinMessage: '',
//     errMessage: '',
//     googleSignIn: () => Promise.resolve(),
//     SignInStore: {}
//   };
//   return <UserSignIn {...props} />;
// };
// // const wrapper = constProps();

describe('PostIt-app', () => {
  // beforeEach(() => {
  //   window.localStorage.setItem('user', JSON.stringify({
  //     email: 'quduskunle@gmail.com',
  //     password: 'Ka123@'
  //   }));
  // });
  const props = {
    userName: '',
    userId: '',
    email: '',
    password: '',
    signinMessage: '',
    errMessage: '',
    googleSignIn: () => Promise.resolve(),
    SignInStore: {}
  };
  const wrapper = mount(<UserSignIn {...props}/>,
    {
      childContextTypes: { router: React.PropTypes.object },
      context: { router:
      {
        history: {
          push: () => null,
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
  it('should have an empty initial state', () => {
    expect(wrapper.state()).toBeDefined();
    console.log(wrapper.props().userName);
    console.log(wrapper.state());
    // expect(wrapper.state().userName).toEqual('');
    // expect(wrapper.state().userId).toEqual('');
    // expect(wrapper.state().email).toEqual('');
    // expect(wrapper.state().password).toEqual('');
    // expect(wrapper.state().siginMessage).toEqual('');
    // expect(wrapper.state().errMessage).toEqual('');
    // expect(wrapper.state().loggedIn).toBe(false);
  });
  it('expects UserSignUp component to contain <Footer/>', () => {
    expect(wrapper.find(Footer).root.length).toEqual(1);
  });
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  // it('should render correctly', () => {
  //   const component = mount(<UserSignIn/>);
  //   expect(component).toMatchSnapshot();
  // });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
    expect(wrapper.nodes[0].handleSignInAction).toBeDefined();
    expect(wrapper.nodes[0].googleSignIn).toBeDefined();
    expect(wrapper.nodes[0].handleGoogleEvent).toBeDefined();
  });
  it('It should call onChange method', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/signin');
  });
});

describe('PostIt-app', () => {
  it('should render correctly', () => {
    const component = shallow(<UserSignIn/>);
    expect(component).toMatchSnapshot();
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(2);
    expect(component.find('input.signinform')).toHaveLength(2);
  });
  // it('simulates click events', () => {
  //   const googleSignIn = sinon.spy();
  //   const wrapper = shallow(<UserSignIn onClick={googleSignIn}/>);
  //   wrapper.find('GoogleButton').simulate('click');
  //   expect(wrapper.find('GoogleButton').exists()).toBeTruthy();
  //   expect(wrapper.find('GoogleButton')).toHaveLength(1);
  // });
});
