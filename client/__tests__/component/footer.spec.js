import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Footer from '../../src/components/Footer';

describe('PostIt-app', () => {
  it('expects Footer component to be defined', () => {
    expect(Footer).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<Footer/>);
    expect(component).toMatchSnapshot();
    expect(component.find('.footer')).toHaveLength(1);
    expect(component.find('div')).toHaveLength(1);
  });
});
