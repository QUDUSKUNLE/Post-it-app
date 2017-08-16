import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { addMember, signoutAction } from '../actions/appActions.js';
import '../../css/icon.css';
const loggedIn = (localStorage.getItem('user')) !== false;

/**
  * Represents AddMember Component.
*/
export default class AddMember extends React.Component {
  /**
    * @param {string} props inbuilt props.
  */
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      member: '',
      addmemberMess: ''
    };
    this.onChange = this.onChange.bind(this); // bind the input values

    this.onSubmit = this.onSubmit.bind(this); // onSubmit events

    this.onClick = this.onClick.bind(this); // Sign out
  }

  /**
    * onChange event.
    * @param {object} addmember The first number.
    * @returns {void} bind input values to name.
  */
  onChange(addmember) {
    this.setState({
      [addmember.target.name]: addmember.target.value
    });
  }

  /**
    * onSubmit event.
    * @param {object} e .
    * @returns {void} .
  */
  onSubmit(e) {
    e.preventDefault();
    const memberDetails = {
      email: JSON.parse(localStorage.getItem('user')).email,
      password: JSON.parse(localStorage.getItem('user')).password,
      group: this.state.group,
      member: this.state.member
    };
    // add member Action
    addMember(memberDetails)
      .then((res) => {
        if (res) {
          this.setState({
            addmemberMess: res.data.message
          });
        }
        this.props.history.push('/broadcastboard');
      })
      .catch((err) => {
        if (err) {
          this.setState({
            addmemberMess: err.response.data.message
          });
        }
      });
  }

  /**
    * onClick event.
    * @param {void} nil no parameter.
    * @returns {object} response from server.
 */
  onClick() {
    signoutAction()
      .then(() => {
        localStorage.removeItem('user');
        this.props.history.push('/');
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
        }
      });
  }

  /**
    * @override
  */
  render() {
    if (!loggedIn) {
      return (
        <Redirect to="/signin" />
      );
    }
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top"
          role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav"></ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/broadcastboard">Chat Room</Link></li>
                <li className="active"><Link to="/member">AddMember</Link></li>
                <li onClick={this.onClick}><Link to="/">Sign Out</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container addmember">
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="row w3-card w3-white">
                <div>
                  <center>
                    <span>{this.state.addmemberMess}</span>
                  </center>
                </div>
                <form className="addmemberform" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="groupname">Group Name</label>
                    <input value={this.state.group} onChange={this.onChange}
                      id="groupname" type="text"
                      className="signinform" placeholder="andela-abuja"
                      name="group" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Member</label>
                    <input value={this.state.member} onChange={this.onChange}
                      id="member" type="text"
                      className="signinform" placeholder="adewale"
                      name="member" required/>
                  </div>
                  <button type="submit" className="signinformbtn">Add Member
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddMember.propTypes = {
  history: PropTypes.node
};
