import React from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import sinon from 'sinon';
import UserAddMember from '../../src/components/UserAddMember';
import localStorageMock from '../../src/__mock__/localStorage';

window.localStorage = localStorageMock;
describe('<UserAddMember/>', () => {
  const props = {
    groups: [],
    registeredUsers: [],
    group: {},
    member: '',
    closeModal: jest.fn()
  };
  const wrapper = mount(<UserAddMember {...props} />,
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
    }
  );

  it('component is expected to be defined', () => {
    expect(UserAddMember).toBeDefined();
    expect(wrapper.state()).toBeDefined();
  });

  it('component methods expected to be defined', () => {
    expect(wrapper.nodes[0].handleAddMemberToGroup).toBeDefined();
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
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
});
