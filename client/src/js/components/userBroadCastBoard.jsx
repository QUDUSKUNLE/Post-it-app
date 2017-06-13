import React from 'react';
import { Link } from 'react-router-dom';
class BroadCastBoard extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<ul className="nav nav-pills nav-justified">
								<li role="presentation" class="active"><Link to="/user/broadcastboard">BroadcastBoard</Link></li>
								<li role="presentation" data-toggle="modal" data-target="#myModal"><Link to="/user/group">Create Group</Link></li>
								<li role="presentation"><Link to="/user/addmember">Add member</Link></li>
								<li role="presentation"><Link to="/">Sign out</Link></li>
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
