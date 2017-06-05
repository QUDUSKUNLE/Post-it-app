import React from 'react';

class CreateGroup extends React.Component {
	render() {
		let group = (
			<div className="row">
				<div className="col-md-5 col-md-offset-3">
					<form>
						<legend><i>Create a group</i></legend><br />	
						<div className="form-group">
							<input type="text" name="" className="form-control" placeholder="Group name" required/>
						</div>
						<button type="submit" className="btn btn-success form-control">Create Group</button>
						<br />
						<br />
						<button type="submit" className="btn btn-warning form-control">Back</button>
					</form>	
				</div>
			</div>
		);
		
		return (
			<div>
				{group}	
			</div>

		);
	}
};

export default CreateGroup;
