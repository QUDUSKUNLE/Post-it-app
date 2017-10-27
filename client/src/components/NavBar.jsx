import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import UserApp from './UserApp';

/**
 * @export
 * @description - renders NavBar Component
 * @class NavBar
 * @extends {React.Component}
 */
export default class NavBar extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      UserIn: false
    };
  }
  render() {
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
              <Link className="navbar-brand" to="/">
                PostIt<small>App</small>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
              {!this.state.UserIn
               ? <ul className="nav navbar-nav navbar-right">
                  <li className="active"><Link to="/">Home</Link></li>
                  <li><Link to="/signin">Sign in</Link></li>
                 </ul>
                : <ul className="nav navbar-nav navbar-right">
                  <li className="active"><Link to="/">BroadCastBoard</Link></li>
                  <li><Link to="/group">Create Group</Link></li>
                  <li><Link to="#">Sign out</Link></li>
                 </ul>
              }
            </div>
          </div>
        </nav>
        <UserApp/>
        <Footer/>
      </div>
    );
  }
}
