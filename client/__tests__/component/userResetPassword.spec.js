// import React from 'react';
// import expect from 'expect';
// import { mount, shallow } from 'enzyme';
// import UserResetPassword
//   from '../../src/components/UserResetPassword';
// import localStorageMock from '../../src/__mock__/localStorage';
// import SignInStore from '../../src/stores/SignInStore';

// describe('PostIt-app', () => {
//   let wrapper;
//   beforeEach(() => {
//     localStorageMock.setItem('email', JSON.stringify(
//      'andela-dbamidele@andela.com'));
//     wrapper = mount(<UserResetPassword email = {''} />);
//   });

//   it('should render without crashing', () => {
//     mount(<UserResetPassword/>);
//   });
//   // it('expects UserResetComponent component to be defined', () => {
//   //   expect(UserResetPassword).toBeDefined();
//   // });
//   it('should render correctly', () => {
//     const component = shallow(<UserResetPassword/>);
//     expect(component).toMatchSnapshot();
//     expect(component.find('nav')).toHaveLength(1);
//     expect(component.find('span')).toHaveLength(4);
//     expect(component.find('form')).toHaveLength(1);
//     expect(component.find('input')).toHaveLength(1);
//     expect(component.find('button')).toHaveLength(2);
//     expect(component.find('Link')).toHaveLength(4);
//     expect(component.find('Footer')).toHaveLength(1);
//     expect(component.find('input.signinform')).toHaveLength(1);
//     component.instance().componentDidMount();
//     component.instance().componentWillUnmount();
//   });
//   it('should render correctly', () => {
//     const component = shallow(<UserResetPassword/>);
//     expect(component).toMatchSnapshot();
//     expect(component.find('nav')).toHaveLength(1);
//   });
//   // it('should call componentDidMount lifecycle', () => {
//   //   const onSpy = jest.spyOn(SignInStore, 'on');
//   //   expect(onSpy).toHaveBeenCalled();
//   // });
//   // it('should call onChange', () => {
//   //   const event = { target: { name: 'name', value: 'value' } };
//   //   wrapper.instance().onChange(event);
//   //   expect(wrapper.state().name).toEqual('value');
//   // });
//   // it('should call onSubmit', () => {
//   //   wrapper.instance().onSubmit({ preventDefault() {} });
//   //   expect(wrapper.state().email).toEqual('');
//   //   expect(wrapper.props().resetPassword()).toBeDefined();
//   // });
// });
