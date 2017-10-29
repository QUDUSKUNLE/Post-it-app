import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import expect from 'expect';
import sinon from 'sinon';
import localStorageMock from '../../src/__mock__/localStorage';
import UserBroadCastBoard from '../../src/components/UserBroadCastBoard';

window.localStorage = localStorageMock;
describe('UserBroadCastBoard Component', () => {
  let wrapper;
  let component;

  beforeEach(() => {
    window.localStorage.setItem('userIn', JSON.stringify(true));
    window.localStorage.setItem('Id', JSON.stringify('AZCVGFRTUINSMUY15156'));
    window.localStorage.setItem('userName', JSON.stringify('Kunle'));
    const props = {
      loggedIn: JSON.parse(localStorage.getItem('userIn')),
      userId: JSON.parse(localStorage.getItem('Id')),
      defaultGroup: '',
      groups: [],
      groupId: '',
      userName: JSON.parse(localStorage.getItem('userName')),
      groupMessage: [],
      groupMember: [],
      groupSelected: false
    };
    component = shallow(<UserBroadCastBoard {...props}/>);
    wrapper = mount(<UserBroadCastBoard {...props}/>,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: {
          router:
          {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/broadcastboard',
              component: '[function UserBroadCastBoard]',
              location: {
                pathname: '/broadcastboard',
                search: '',
                hash: '',
                key: '6l9jpq'
              },
              computedMatch: {
                path: '/broadcastboard',
                url: '/broadcastboard',
                isExact: true,
                params: {}
              }
            }
          }
        }
      }
    );
  });
  it('expects BroadcastBoard component to be defined', () => {
    expect(UserBroadCastBoard).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().userName).toEqual('Kunle');
    expect(wrapper.state().userId).toEqual('AZCVGFRTUINSMUY15156');
    expect(wrapper.state().groupSelected).toEqual(false);
    expect(wrapper.state().defaultGroup).toEqual('');
    expect(wrapper.state().groups).toEqual([]);
    expect(wrapper.state().groupId).toEqual('');
    expect(wrapper.state().groupMessage).toEqual([]);
    expect(wrapper.state().groupMember).toEqual([]);
  });

  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].handleOnChangeEvent).toBeDefined();
    expect(wrapper.nodes[0].handleSignOutAction).toBeDefined();
    expect(wrapper.nodes[0].handleSendGroupMessage).toBeDefined();
    expect(wrapper.nodes[0].handleGetGroupMessage).toBeDefined();
    expect(wrapper.nodes[0].handleGetUserGroups).toBeDefined();
    expect(wrapper.nodes[0].handleGetGroupMember).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('div')).toHaveLength(10);
    expect(component.find('span')).toHaveLength(3);
    expect(component.find('form')).toHaveLength(0);
    expect(component.find('button')).toHaveLength(1);
    expect(component.find('Link')).toHaveLength(4);
    expect(component.find('Footer')).toHaveLength(1);
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/broadcastboard');
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/group');
  });
  it('should componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserBroadCastBoard.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserBroadCastBoard.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserBroadCastBoard.prototype, 'componentWillMount');
    wrapper.instance().componentWillMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  // describe('Test for user log out', () => {
  //   it('should log a user out on click', () => {
  //     const event = {
  //       type: 'click',
  //       preventDefault: sinon.spy(),
  //     };
  //     wrapper.instance().handleLogOut(event);
  //     expect(event.preventDefault.calledOnce).toBeTruthy();
  //     window.localStorage.clear();
  //     expect(window.localStorage.getItem('user')).toEqual(undefined);
  //   });
  // });
});
