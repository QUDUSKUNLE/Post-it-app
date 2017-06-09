import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CreateGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			groupname: ''
		}
		// Bind Create Group Inpu Fields
		this.onChange = this.onChange.bind(this);

		// Bind to Create Group Form
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(createGroup) {
		this.setState({ [createGroup.target.name]: createGroup.target.value });
	}

	onSubmit(createGroup) {
		createGroup.preventDefault();
		axios.post('/user/group', { user: this.state });
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<form className="col s6 offset-s3" onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="groupname">Group Name</label>	
								<input value={this.state.groupname} onChange={this.onChange}
									id="groupname" type="text"
									className="validate" placeholder="andela-abuja"
									name='groupname'/>	
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>	
								<input value={this.state.email} onChange={this.onChange}
									id="email" type="email"
									className="validate" placeholder="johndoe@example.com"
									name='email'/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input value={this.state.password} onChange={this.onChange}
									id="pass" type="password"
									className="validate" placeholder="*********"
									name='password' />
							</div>
							<button type="submit" className="btn btn-success col s12">Create Group</button>
							<br /> <br />
							<Link to="/"><button type="btn" className="btn btn-success col s12">Back</button></Link>
						</form>
					</div>
				</div>
			</div>

		);
	}
};

export default CreateGroup;
