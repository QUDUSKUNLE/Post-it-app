import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Represents BroadCastBoard Component.
 */
class BroadCastBoard extends React.Component {
	// BroadCastBoard constructor
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

	/**
 * onClick event.
 * @param {void} nill no parameter.
 * @returns {object} response from server.
 */
  onClick() {
    axios.post('/signout').then((response) => {
      alert(response.data.message);
				// console.log(response.data);
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
					// console.log(error.response.data);
      }
    });
  }
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
							<button type="button" className="navbar-toggle"
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
								<li><Link to="/">Home</Link></li>
								<li className="active">
									<Link to="/broadcastboard">ChatRoom</Link>
								</li>
								<li onClick={this.onClick}><Link to="#">Sign out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<ul className="nav nav-pills nav-justified">
								<li role="presentation" className="active">
									<Link to="/broadcastboard">BroadcastBoard</Link>
								</li>
								<li role="presentation" data-toggle="modal"
									data-target="#myModal"><Link to="/group">Create Group</Link>
								</li>
								<li role="presentation"><Link to="/member">Add member</Link>
							</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
						</div>
						<div className="col-md-6"></div>
						<div className="col-md-3"></div>
					</div>
				</div>
			</div>
    );
  }
}

// Export BroadCastBoard Component
export default BroadCastBoard;
