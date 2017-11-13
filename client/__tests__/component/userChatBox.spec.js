import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import UserChatBox from '../../src/components/UserChatBox.jsx';
import localStorageMock from '../../src/__mock__/localStorage';
import groupMessageResponse from '../../src/__mock__/groupMessageResponse.json';

window.localStorage = localStorageMock;
describe('<UserChatBox />', () => {
  let wrapper;
  let component;
  beforeEach(() => {
    window.localStorage.setItem('userName', JSON.stringify('Kunle'));
    window.localStorage.setItem('Id', JSON.stringify('AZCVGFRTUINSMUY15156'));
    const props = {
      userId: JSON.parse(localStorage.getItem('Id')),
      username: JSON.parse(localStorage.getItem('userName')),
      message: '',
      priority: 'normal',
      allGeneralMessage: groupMessageResponse.response
    };
    component = shallow(<UserChatBox {...props} />);
    wrapper = mount(<UserChatBox {...props}/>,
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
  });
  it('component expected to be defined', () => {
    expect(component.find('div')).toHaveLength(10);
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(2);
    expect(component.find('Link')).toHaveLength(1);
  });
  it('component states expected to be defined before it mounts', () => {
    expect(UserChatBox).toBeDefined();
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().username).toEqual('Kunle');
    expect(wrapper.state().userId).toEqual('AZCVGFRTUINSMUY15156');
  });
  it('component should call onChange method', () => {
    const event = {
      target: { name: 'name', value: 'value' }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
});
