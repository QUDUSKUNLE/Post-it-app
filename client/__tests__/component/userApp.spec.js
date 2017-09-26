import React from 'react';
import { shallow } from 'enzyme';
import App from '../../client/src/js/components/userApp.jsx';
import NavBar from '../../client/src/js/components/navBar.jsx';
import SignUp from '../../client/src/js/components/userSignUp.jsx';

describe('App component', () => {
  it('expected to be defined', () => {
    expect(App).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<App/>);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const component = shallow(<NavBar/>);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const component = shallow(<SignUp/>);
    expect(component).toMatchSnapshot();
  });
  it('should render without crashing', () => {
    const component = shallow(<App/>);
    expect(component.find('.home').exists()).toBeTruthy();
  });
});
