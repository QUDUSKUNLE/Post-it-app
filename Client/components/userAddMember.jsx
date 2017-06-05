import React from 'react';

class AddMember extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<form>
								<legend>Create a group</legend><br />
								<div className="form-group">
									<input type="text" name="" className="form-control" placeholder="groupName" required />
								</div>
								<button type="submit" className="btn btn-primary form-control">Create Group</button>
								<br />
								<br />
								<button type="submit" className="btn btn-danger form-control">Back</button>
							</form>
						</div>
					</div>
				</div>
			</div>

		);
	}
};

export default AddMember;
