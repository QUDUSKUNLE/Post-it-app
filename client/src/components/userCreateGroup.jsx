import React from 'react';

class CreateGroup extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<form className="col s6 offset-s3" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="email">Group Name</label>	
								<input id="email" type="text" className="validate" placeholder="andela-abuja" ref={(email)=>this.email = email}/>	
							</div>
							<div className="form-group">
								<label htmlFor="password">Username</label>	
								<input id="password" type="text" className="validate" placeholder="shola" ref={(password)=>this.password=password} />
							</div>
							<button type="submit" className="btn btn-success col s12">Create Group</button>
						</form>
					</div>
				</div>
			</div>

		);
	}
};

export default CreateGroup;
