import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/icon.css';

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
    this.state = {
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
		// Bind signOut tab to onClick event
    this.onClick = this.onClick.bind(this);
  }

	/**
 * onChange event.
 * @param {object} message The first number.
 * @returns {void} bind input values to name.
 */
  onChange(message) {
    this.setState({
      [message.target.name]: message.target.value
    });
  }

	/**
 * onSubmit event.
 * @param {object} message .
 * @returns {void} .
 */
  onSubmit(message) {
    message.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    axios.post('/groupName/message', broadcastmessage).then(() => {
      alert('message sent');
    });
  }
	/**
 * onClick event.
 * @param {void} nill no parameter.
 * @returns {object} response from server.
 */
  onClick() {
    axios.post('/signout').then((response) => {
      alert(response.data.message);
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
								<li role="presentation"><Link to="/member">
								Add member</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="col-md-12">
						<div className="row board">
							<div className="col-md-3"
								style={{ backgroundColor: '#756d6d' }}>
								<h5 className="text-center para">Groups</h5>
								<hr />
								<br />
								<div className="row">
                  <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
                    <ul>
                      <li>Andela Lagos</li>
											<li>Andela Abuja</li>
											<li>Andela Calabar</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-md-6"
								style={{ backgroundColor: '#2d2d2d' }}>
								<h5 className="text-center para">Group: Andela Abuja</h5>
								<hr />
								<br />
								<div className="row">
                  <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
                    <form id="broadcastform" onSubmit={this.onSubmit}>
                      <div className="form-group">
												<input type="text" name="message"
													onChange={this.onChange} placeholder="write message"
													className="form-control" value={this.state.message} />
											</div>
											<button type="submit"
												className="btn btn-primary pull-right">Send</button>
										</form>
									</div>
								</div>
							</div>
							<div className="col-md-3"
								style={{ backgroundColor: '#756d6d' }}>
								<h5 className="text-center para">Group member</h5>
								<hr />
								<br />
								<div className="row">
                  <div className="col-md-12 col-xs-12 col-lg-12 broadcastbody">
                    <div>
											<ul>
												<li>ebuka</li>
												<li>quduskunle</li>
												<li>osayamen</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

// Export BroadCastBoard Component
export default BroadCastBoard;
