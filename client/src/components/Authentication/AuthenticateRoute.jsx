import React from 'react';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import PropTypes from 'prop-types';

const AuthenticateRoute = (UserComponent) => {
  /**
   * Protect other component from unauthenticated users
   * @class AuthenticateComponent
   * @extends {Component}
   */
  class AuthenticateComponent extends React.Component {
    /**
     * Creates an instance of Authenticate
     * @constructor
     * @param {any} props
     * @memberof Authenticate
     */
    constructor(props) {
      super(props);
      this.state = {
        expiredToken: null
      };
    }

    /**
     * Life Cycle method to be called before a component mounts
     * @method componentWillMount
     * @return {void} void
     */
    componentWillMount() {
      const getToken = JSON.parse(localStorage.getItem('token'));
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        this.props.history.push('/');
      }
      if (getToken) {
        if (this.isTokenExpired() === true) {
          this.setState({ expiredToken: true });
          this.props.history.push('/');
          toastr.error('Your session has expired');
          localStorage.clear();
        }
      }
    }
    /**
     * Life cycle method to be called after a component mounts
     * @method componentDidMount
     * @return {void} void
     */
    componentDidMount() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
     * Check is token has expired
     * @method isTokenExpired
     * @return {void}
     */
    isTokenExpired() {
      const token = jwt.decode(JSON.parse(localStorage.getItem('token')));
      const date = token.exp;
      this.setState({
        expiredToken: date < Date.now() / 1000,
      });
      return date < Date.now() / 1000;
    }

    /**
     * Display the DOM Component
     * @method render
     * @return {DOM} DOM Component
     */
    render() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated || this.state.expiredToken === true) {
        return null;
      }
      return (
        <UserComponent {...this.props} />
      );
    }
  }
  AuthenticateComponent.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    })
  };
  return (AuthenticateComponent);
};
export default AuthenticateRoute;
