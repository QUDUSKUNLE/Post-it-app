import React from 'react';

class BroadCastBoard extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-md-offset-4">
							<h3 className="text-center">Broadcast board</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 col-md-offset-8 text-right">
							<a href="#"><i>Sign out</i></a>
						</div>
					</div>
					<br />
					<table className="table-hover table table-bordered">
						<thead>
							<tr>
								<th colSpan="1" className="text-center">Groups</th>
								<th colSpan="2" className="text-center"><i>Andela</i></th>
								<th colSpan="1" className="text-center">Group Member</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan="1">
									<ul className="list-unstyled">
										<li>Andela</li>
										<li>Sports</li>
										<li>Games</li>
										<li>Yahoo Yahoo</li>
										<li>Directors</li>
										<li>Management</li>
										<li>OAU Alumni</li>
									</ul>
								</td>
								<td className="text-center" colSpan="2">BroadCast board</td>
								<td className="text-center" colSpan="1">Shola Adenaike</td>
							</tr>
							<tr>
								<td colSpan="1"></td>
								<td colSpan="2">
									<form>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="message..." />
										</div>
										<button type="button" className="btn btn-success">Send</button>
									</form>
								</td>
								<td colSpan="1"></td>
							</tr>
						</tbody>
					</table>
				</div>	
			</div>
		);
	}
};

export default BroadCastBoard;
