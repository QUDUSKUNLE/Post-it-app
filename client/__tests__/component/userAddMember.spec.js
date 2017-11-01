import React from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import UserAddMember from '../../src/components/UserAddMember';
import localStorageMock from '../../src/__mock__/localStorage';

window.localStorage = localStorageMock;
describe('AddMember component', () => {
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
  it('expects UserAddMember component to be defined', () => {
    expect(UserAddMember).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().loggedIn).toEqual(true);
    expect(wrapper.state().userId).toEqual('AZCVGFRTUINSMUY15156');
  });
  it('expects methods to be defined', () => {
    expect(wrapper.nodes[0].handleSignOutEvent).toBeDefined();
    expect(wrapper.nodes[0].handleAddMemberToGroup).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component.find('div')).toHaveLength(10);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(2);
    expect(component.find('Link')).toHaveLength(4);
    expect(component.find('Footer')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/broadcastboard');
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/member');
  });
  it('should componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserAddMember.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserAddMember.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call onChange', () => {
    const event = {
      target: { name: 'name', value: 'value' }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
});
