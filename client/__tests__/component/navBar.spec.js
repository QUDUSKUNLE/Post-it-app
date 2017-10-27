import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import renderer from 'react-test-renderer';
import NavBar from '../../src/components/NavBar.jsx';

describe('PostIt-app', () => {
  it('expects NavBar component to be defined', () => {
    expect(NavBar).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<NavBar/>);
    expect(component).toMatchSnapshot();
    expect(component.find('nav').length).toBe(1);
    expect(component.find('nav')).toHaveLength(1);
    expect(component.find('div')).toHaveLength(4);
    expect(component.find('span')).toHaveLength(4);
    expect(component.find('Link')).toHaveLength(3);
    expect(component.find('ul')).toHaveLength(2);
    expect(component.find('li')).toHaveLength(2);
  });
});
