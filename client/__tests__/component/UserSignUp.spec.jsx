import PropTypes from 'prop-types';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import UserSignUp from '../../src/components/UserSignUp.jsx';

describe('PostIt-app', () => {
  let wrapper;
  let component;
  beforeEach(() => {
    const props = {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      confirmPassword: ''
    };
    component = shallow(<UserSignUp {...props}/>);
    wrapper = mount(<UserSignUp {...props}/>,
      {
        childContextTypes: { router: PropTypes.object },
        context: {
          router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/',
              component: '[function UserSignUp]',
              location: {
                pathname: '/',
                search: '',
                hash: '',
                key: '6l9jpq'
              },
              computedMatch: {
                path: '/',
                url: '/',
                isExact: true,
                params: {}
              }
            }
          }
        }
      });
  });
  it('expects UserSignUp component to be defined', () => {
    expect(UserSignUp).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('div').length).toBe(8);
  });
});
