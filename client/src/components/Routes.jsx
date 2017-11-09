import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import toastr from 'toastr';
import signOutAction from '../actions/signOutActions';
import UserSignIn from './UserSignIn';
import UserCreateGroup from './UserCreateGroup';
import UserBroadCastBoard from './UserBroadCastBoard';
import UserAddMember from './UserAddMember';
import Home from './Home';
import Footer from './Footer';
import UserResetPassword from './UserResetPassword';
import NotFound from './NotFound';

/**
 * @description - renders Routes Component
 * @class Routes
 * @extends {React.Component}
 */
class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOutEvent = this.handleSignOutEvent.bind(this);
  }

  /**
   * @description This handles SignOutEvent
   * @param {*} void - no parameter.
   * @returns {object} response from server.
   */
  handleSignOutEvent() {
    signOutAction().then((response) => {
      toastr.success(response.data.message);
      localStorage.clear();
      this.props.history.push('/');
    }).catch(error => toastr.error(error.response.data));
  }
  render() {
    const { location } = this.props;
    const path = [
      {
        path: '/',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign in</Link></li>
          </ul>
        )
      },
      {
        path: '/signin',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li><Link to="/">Home</Link></li>
            <li className="active"><Link to="/signin">Sign in</Link></li>
          </ul>
        )
      },
      {
        path: '/passwordreset',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign in</Link></li>
            <li className="active">
              <Link to="/passwordreset">PasswordReset</Link></li>
          </ul>
        )
      },
      {
        path: '/broadcastboard',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li className="active">
              <Link to="/broadcastboard">MessageBoard</Link>
            </li>
            <li><Link to="/group">Create Group</Link></li>
            <li onClick={this.handleSignOutEvent}>
              <Link to="#">Sign out</Link>
            </li>
          </ul>
        )
      },
      {
        path: '/member',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li><Link to="/broadcastboard">MessageBoard</Link></li>
            <li className="active"><Link to="/member">Add Member</Link></li>
            <li onClick={this.handleSignOutEvent}>
              <Link to="#">Sign Out</Link>
            </li>
          </ul>
        )
      },
      {
        path: '/group',
        ul: (
          <ul className="nav navbar-nav navbar-right" key={location.key}>
            <li><Link to="/broadcastboard">MessageBoard</Link></li>
            <li className="active"><Link to="/group">Create Group</Link></li>
            <li onClick={this.handleSignOutEvent}>
              <Link to="#">Sign Out</Link></li>
          </ul>
        )
      }
    ];
    return (
        <div>
          <nav className="navbar navbar-inverse navabar-fixed-top"
            role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="#">
                  <i>PostIt</i>
                </Link>
              </div>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                </ul>
                {path.filter(pathname =>
                  pathname.path === location.pathname).map(
                    exactPath => exactPath.ul)
                }
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/passwordreset" component={UserResetPassword} />
            <Route path="/broadcastboard" component={UserBroadCastBoard} />
            <Route path="/group" component={UserCreateGroup} />
            <Route path="/member" component={UserAddMember} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(Routes);
