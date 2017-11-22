import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ToggleButton from '../../src/components/ToggleButton';

describe('<ToggleButton />', () => {
  it('component should be defined', () => {
    expect(ToggleButton).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<ToggleButton />);
    expect(component).toMatchSnapshot();
    expect(component.find('button')).toHaveLength(1);
    expect(component.find('p')).toHaveLength(1);
  });
});
