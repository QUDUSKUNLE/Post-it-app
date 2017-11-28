import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import $ from 'jquery';
import { addMember, searchUser } from '../actions/memberAction';
import MemberStore from '../stores/MemberStore';

/**
 * @export
 * @description - renders AddMember Component
 * @class UserAddMember
 * @extends {React.Component}
 */
export default class UserAddMember extends React.Component {
  /**
   * Creates an instance of UserAddMember.
   * @constructor
   * @param {any} props -
   * @memberof UserAddMember
   */
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      member: '',
      keyword: '',
      searchResult: [],
      show: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddMemberToGroup = this.handleAddMemberToGroup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @method componentDidMount
   * @description Adds an event Listener to the Store and fires
	 * when the component is fully mounted.
   * @return {void} void
   * @memberof UserAddMember
   */
  componentDidMount() {
    $('#selectId').val('');
    MemberStore.on('ADD_MEMBER', this.handleAddMemberToGroup);
    MemberStore.on('SEARCH_USER', this.handleSearch);
  }

  /**
   * @method componentWillUnmount
   * @description remove event Listener from the Store and fires.
   * @return {void} void
   * @memberof UserAddMember
   */
  componentWillUnmount() {
    MemberStore.removeListener('ADD_MEMBER', this.handleAddMemberToGroup);
    MemberStore.removeListener('SEARCH_USER', this.handleSearch);
  }
  /**
   * @description - onChange event
   * @param {event} event - event
   * @returns {any} null
   * @memberOf ChatBox
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value,
      searchResult: MemberStore.getSearchUser()
    });
  }

  /**
   * @description This handles addMember form submission
   * @param {object} event .
   * @returns {void} .
  */
  onSubmit(event) {
    event.preventDefault();
    const memberDetails = {
      groupId: this.props.groupId,
      memberId: $('#selectId').val()
    };
    if ($('#selectId').val() === 'No user Found') {
      toastr.error('User does not exist!');
    }
    if (!this.state.show) {
      addMember(memberDetails);
    }
  }

  /**
   * @description This handles on select of a member
   * @param {string} memberId
   * @returns {void} .
  */
  onSelect(memberId) {
    $('#selectId').val(memberId);
  }

  /**
   * @description This handles search query
   * @returns {void} .
  */
  handleKeyPress() {
    const query = { keyword: this.state.keyword };
    if ((this.state.keyword).length >= 1) {
      searchUser(query);
    }
  }
  /**
   * @memberof UserAddMember
   * @return {void} void
   */
  handleSearch() {
    if (MemberStore.getSearchUser()[0].userName === 'No user Found') {
      this.setState({
        searchResult: this.state.searchResult,
        show: true
      });
    } else {
      this.setState({
        searchResult: MemberStore.getSearchUser(),
        show: false
      });
    }
  }

  /**
   * @description This handles addMember update from store
   * @param {object} event .
   * @returns {void} .
   */
  handleAddMemberToGroup() {
    const addMemberResponse = MemberStore.addMember();
    toastr.success(addMemberResponse);
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} AddMember component
   * @AddMember
   */
  render() {
    return (
      <div className="modal-container">
        <Modal
          show={this.props.modalState}
          onHide={this.props.closeModal}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <form
              className="addmemberform"
              onSubmit={this.onSubmit}
            >
              <div className="form-group">
                <label htmlFor="groupname">
                  Group Name
                </label>
                <input
                  value={this.props.selectedGroup}
                  onChange={this.onChange}
                  type="text"
                  className="form-control"
                  placeholder="Search ...."
                  name="group" required
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="search">
                  Username
                </label>
                <input
                  list="searchUser"
                  id="searchUsers"
                  value={this.state.keyword}
                  onChange={this.onChange}
                  onKeyPress={this.handleKeyPress}
                  type="text"
                  className="form-control"
                  placeholder="type username"
                  name="keyword" required
                />
                <datalist id="searchUser">
                  {(this.state.searchResult).map((user, index) =>
                    (<option
                      key={index} value={user.userName}
                      onClick={this.onSelect(user.userId)}
                    />)
                  )}
                </datalist>
                <input
                  id="selectId"
                  type="hidden"
                  name="search"
                />
              </div>
              <button
                type="submit"
                className="signinformbtn"
              >Add Member
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

// props validation
UserAddMember.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  memberId: PropTypes.string,
  selectedGroup: PropTypes.string,
  groupId: PropTypes.string,
  modalState: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
};
