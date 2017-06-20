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
		// Bind Create Group Input Fields
		this.onChange = this.onChange.bind(this);

		// Bind to Create Group Form
		this.onSubmit = this.onSubmit.bind(this);

		//
	}
	onChange(createGroup) {
		this.setState({ [createGroup.target.name]: createGroup.target.value });
	}

	onSubmit(createGroup) {
		createGroup.preventDefault();
		axios.post('/user/group', this.state );
		alert(this.state.groupname + ' group created successfully!!!');
		console.log(this.state);
	}
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
								<li><Link to="/">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </div>
				<div className="container">
					<div className="row">
						<div className="col-md-offset-3 col-md-6">
							<div className='row'>
								<form className="col-md-offset-3 col-md-6" onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="groupname">Group Name</label>
										<input value={this.state.groupname} onChange={this.onChange}
											id="groupname" type="text"
											className="form-control" placeholder="andela-abuja"
											name='groupname' required/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="form-control" placeholder="johndoe@example.com"
											name='email' required/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input value={this.state.password} onChange={this.onChange}
											id="pass" type="password"
											className="form-control" placeholder="*********"
											name='password' required/>
									</div>
									<button type="submit" className="btn btn-success form-control">Create Group</button>
								</form>
							</div>
						</div>


					</div>
				</div>
			</div>

		);
	}
};

export default CreateGroup;
