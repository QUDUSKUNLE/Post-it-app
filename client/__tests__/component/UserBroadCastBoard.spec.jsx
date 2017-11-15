import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import 'babel-polyfill';
import MessageStore from '../../src/stores/MessageStore';
import MemberStore from '../../src/stores/MemberStore';
import localStorageMock from '../../src/__mock__/localStorage';
import UserBroadCastBoard from '../../src/components/UserBroadCastBoard';

window.localStorage = localStorageMock;
describe('<UserBroadCastBoard/>', () => {
  let wrapper;
  // Mock MemberStore allGroupMessage
  const mockOnMessage = sinon.stub(MessageStore,
    'on').callsFake((message, cb) => cb());
  const mockUnMountMessage = sinon.stub(MessageStore,
    'removeListener').callsFake((message, cb) => cb());
  const mockMessageResponse = sinon.stub(MessageStore,
    'allGroupMessage').returns([{ name: 'Gold', message: 'Shola is here' }]);

  // Mock MemberStore allGroupMembers
  const mockOnMembers = sinon.stub(MemberStore,
    'on').callsFake((member, cb) => cb());
  const mockUnMountMembers = sinon.stub(MemberStore,
    'removeListener').callsFake((member, cb) => cb());
  const mockMemberResponse = sinon.stub(MemberStore,
    'allGroupMembers').returns([[{ a: 1 }, { b: 2 }, { c: 3 }]]);

  beforeEach(() => {
    window.localStorage.setItem('userIn', JSON.stringify(true));
    const props = {
      loggedIn: JSON.parse(localStorage.getItem('userIn')),
      defaultGroup: '',
      groups: [],
      groupId: '',
      groupMessage: [],
      groupMember: [],
      groupSelected: false
    };
    wrapper = mount(<UserBroadCastBoard {...props} />,
      {
        childContextTypes: { router: PropTypes.object },
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
  it('component expected to be defined', () => {
    expect(UserBroadCastBoard).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().groupSelected).toEqual(false);
    expect(wrapper.state().defaultGroup).toEqual('');
    expect(wrapper.state().groups).toEqual([]);
    expect(wrapper.state().groupId).toEqual('');
  });

  it('component should contain defined methods', () => {
    expect(wrapper.nodes[0].handleSendGroupMessage).toBeDefined();
    expect(wrapper.nodes[0].handleGetGroupMessage).toBeDefined();
    expect(wrapper.nodes[0].handleGetUserGroups).toBeDefined();
    expect(wrapper.nodes[0].handleGetGroupMember).toBeDefined();
  });
  it('component should call componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserBroadCastBoard.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('component should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserBroadCastBoard.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('expects componentDidMount to mount when event is fired', () => {
    expect(mockOnMessage.displayName).toEqual('on');
    expect(wrapper.state().loggedIn).toEqual(true);
    expect(wrapper.state().groupMessage).toEqual(mockMessageResponse());
  });
  it('expects componentDidMount to mount', () => {
    expect(mockOnMembers.displayName).toEqual('on');
    expect(wrapper.state().groupMember).toEqual(mockMemberResponse()[0]);
  });
  it('expects componentWillUnmount to be unmounted', () => {
    wrapper.unmount();
    expect(mockUnMountMessage.callCount).toBe(4);
    expect(mockUnMountMessage.displayName).toEqual('removeListener');
  });
  it('expects componentWillUnmount displayName to be removeListener', () => {
    wrapper.unmount();
    expect(mockUnMountMembers.displayName).toEqual('removeListener');
  });
});
