import React from 'react';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import { mount } from 'enzyme';
import expect from 'expect';
import UserChatBox from '../../src/components/UserChatBox';
import localStorageMock from '../../src/__mock__/localStorage';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';

window.localStorage = localStorageMock;
describe('<UserChatBox />', () => {
  sinon.spy(UserChatBox.prototype, 'onSubmit');
  window.localStorage.setItem('userName', JSON.stringify('Kunle'));
  window.localStorage.setItem('Id', JSON.stringify('AZCVGFRTUINSMUY15156'));
  const props = {
    userId: JSON.parse(localStorage.getItem('Id')),
    username: JSON.parse(localStorage.getItem('userName')),
    message: '',
    priority: 'normal',
    allGeneralMessage: groupMessageResponse.response
  };
  const wrapper = mount(<UserChatBox {...props} />,
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
            component: '[function UserChatBox]',
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
    });
  it('component expected to be defined', () => {
    expect(wrapper.find('div')).toHaveLength(12);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
    // expect(wrapper.find('Link')).toHaveLength(0);
  });
  it('component states expected to be defined before it mounts', () => {
    expect(UserChatBox).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().username).toEqual('Kunle');
    expect(wrapper.state().userId).toEqual('AZCVGFRTUINSMUY15156');
  });
  it('component should call onChange method', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
  it('should called onSubmit method when submit button is clicked', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(UserChatBox.prototype.onSubmit.calledOnce).toEqual(true);
  });
});
