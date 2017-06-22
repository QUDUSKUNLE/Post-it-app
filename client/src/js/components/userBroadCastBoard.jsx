import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class BroadCastBoard extends React.Component {
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		axios.post('/signout')
		  .then((response) => {
				alert(response.data.message);
				console.log(response.data);
				this.props.history.push('/');
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data);
				};
			});
	};

	render() {
		return (
			<div>
        <div className="navbar navbar-default" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<h1 className="navbar-brand">
                PostIt<small>App</small>
              </h1>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li className="btn" onClick={this.onClick}>Sign out</li>
							</ul>
						</div>
					</div>
        </div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<ul className="nav nav-pills nav-justified">
								<li role="presentation" className="active"><Link to="/broadcastboard">BroadcastBoard</Link></li>
								<li role="presentation" data-toggle="modal" data-target="#myModal"><Link to="/group">Create Group</Link></li>
								<li role="presentation"><Link to="/member">Add member</Link></li>
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
};

export default BroadCastBoard;
