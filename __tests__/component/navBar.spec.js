import React from 'react';
import { shallow } from 'enzyme';
import  NavBar from '../../client/src/js/components/navBar.jsx';

describe('PostIt-app', () => {
  it('expects App component to be defined', () => {
    expect(NavBar).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<NavBar/>);
    expect(component).toMatchSnapshot();
  });
});
