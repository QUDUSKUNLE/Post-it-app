import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { createGroup } from '../actions/groupAction';
import GroupStore from '../stores/GroupStore';

/**
 * @description - renders CreateGroup Component
 * @class CreateGroup
 * @extends {React.Component}
 */
export default class UserCreateGroup extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      group: ''
    };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateGroupEvent = this.handleCreateGroupEvent.bind(this);
  }

  /**
   * @method componentDidMount
   * @description Adds an event Listener to the Store and fires
	 * when the component is fully mounted.
   * @return {void} void
   * @memberof UserCreateGroup
   */
  componentDidMount() {
    GroupStore.on('CREATE_GROUP', this.handleCreateGroupEvent);
  }

  /**
   * @method componentWillUnmount
   * @description remove event Listener from the Store and fires.
   * @return {void} void
   * @memberof UserCreateGroup
   */
  componentWillUnmount() {
    GroupStore.removeListener('CREATE_GROUP', this.handleCreateGroupEvent);
  }

  /**
   * onChange event.
   * @param {object} event no parameter.
   * @returns {void} bind input data to name.
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description This handles CreateGroup form submission
   * @param {object} event -
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const group = { group: this.state.group };
    createGroup(group);
    this.setState({ group: '' });
  }

  /**
   * @description This handles createGroupEvent
   * @param {*} any .
   * @returns {void} .
   */
  handleCreateGroupEvent() {
    const createGroupResponse = GroupStore.createGroup();
    this.setState({});
    toastr.success(createGroupResponse);
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} CreateGroup component
   */
  render() {
    return (
      <div className="container creategroup">
        <div className="row">
          <div className="col-md-offset-3 col-md-6 creategroupform">
            <h5 className="text-center">
              <b>Create group</b>
            </h5>
            <div className="row w3-card w3-white">
              <form
                id="creategroupform"
                onSubmit={this.onSubmit}
              >
                <div className="form-group">
                  <label htmlFor="groupname">
                    Group Name
                  </label>
                  <input
                    value={this.state.group}
                    onChange={this.onChange}
                    id="groupname"
                    type="text"
                    className="signinform"
                    placeholder="type ...."
                    name="group" required
                  />
                </div>
                <button
                  type="submit"
                  className="signinformbtn"
                >Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
UserCreateGroup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
