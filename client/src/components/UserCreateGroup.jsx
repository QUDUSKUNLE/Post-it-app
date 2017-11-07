import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { createGroup } from '../actions/GroupActions';
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
    const loggedIn = (localStorage.getItem('userIn'));
    super(props);
    this.state = {
      group: '',
      loggedIn
    };

    /**
     * @description This binding is necessary to make `this` work
     * in the callback
     */
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCreateGroupEvent = this.handleCreateGroupEvent.bind(this);
  }

  componentDidMount() {
    GroupStore.on('CREATE_GROUP', this.handleCreateGroupEvent);
  }

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
  }

  /**
   * @description This handles createGroupEvent
   * @param {object} user .
   * @returns {void} .
  */
  handleCreateGroupEvent() {
    const createGroupResponse = GroupStore.createGroup();
    toastr.success(createGroupResponse);
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} CreateGroup component
   */
  render() {
    if (!this.state.loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    return (
      <div className="container creategroup">
        <div className="row">
          <div className="col-md-offset-3 col-md-6 creategroupform">
            <div className="row w3-card w3-white">
              <form id="creategroupform" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="groupname">Group Name</label>
                  <input value={this.state.group} onChange={this.onChange}
                    id="groupname" type="text"
                    className="signinform" placeholder="andela-abuja"
                    name="group" required/>
                </div>
                <button type="submit" className="signinformbtn">
                  Create Group
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
