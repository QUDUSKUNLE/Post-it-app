import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @export
 * @description - renders NavBar Component
 * @class NavBar
 * @extends {React.Component}
 */
export default class NavBar extends React.Component {
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
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
