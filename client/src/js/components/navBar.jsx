
import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Represents NavBar Component.
 */
class NavBar extends React.Component {
  /**
     * @override
     */
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navabar-fixed-top"
          role="navigation">
          <div className="container">
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
// Export Navbar
export default NavBar;
