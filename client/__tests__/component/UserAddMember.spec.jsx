import React from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import UserAddMember from '../../src/components/UserAddMember.jsx';
import localStorageMock from '../../src/__mock__/localStorage.js';

window.localStorage = localStorageMock;
describe('<UserAddMember/>', () => {
  let wrapper;
  let component;
  beforeEach(() => {
    window.localStorage.setItem('userIn', JSON.stringify(true));
    window.localStorage.setItem('Id', JSON.stringify('AZCVGFRTUINSMUY15156'));
    const props = {
      loggedIn: JSON.parse(localStorage.getItem('userIn')),
      userId: JSON.parse(localStorage.getItem('Id')),
      groups: [],
      registeredUsers: [],
      group: {},
      member: ''
    };
    component = shallow(<UserAddMember {...props}/>);
    wrapper = mount(<UserAddMember {...props}/>,
      {
        childContextTypes: { router: PropTypes.object },
        context: {
          router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/member',
              component: '[function AddMember]',
              location: {
                pathname: '/member',
                search: '',
                hash: '',
                key: 'ukxugb'
              },
              computedMatch: {
                path: '/member',
                url: '/member',
                isExact: true,
                params: {}
              }
            }
          }
        }
      });
  });
  it('component expected to be defined', () => {
    expect(UserAddMember).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().loggedIn).toEqual(true);
    expect(wrapper.state().userId).toEqual('AZCVGFRTUINSMUY15156');
  });
  it('component methods expected to be defined', () => {
    expect(wrapper.nodes[0].handleAddMemberToGroup).toBeDefined();
  });
  it('component should render correctly', () => {
    expect(component.find('div')).toHaveLength(6);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
  it('should call componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserAddMember.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserAddMember.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('component should call onChange method', () => {
    const event = {
      target: { name: 'name', value: 'value' }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
});
