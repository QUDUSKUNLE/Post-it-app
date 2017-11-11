import { shallow } from 'enzyme';
import expect from 'expect';
import Footer from '../../src/components/Footer.jsx';

describe('<Footer/>', () => {
  it('component should be defined', () => {
    expect(Footer).toBeDefined();
  });
  it('should render correctly', () => {
    const component = shallow(<Footer/>);
    expect(component).toMatchSnapshot();
    expect(component.find('.footer')).toHaveLength(1);
    expect(component.find('div')).toHaveLength(2);
  });
});
