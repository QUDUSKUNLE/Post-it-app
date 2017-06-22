import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CreateGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			group: '',

		}
		// Bind Create Group Input Fields
		this.onChange = this.onChange.bind(this);

		// Bind to Create Group Form
		this.onSubmit = this.onSubmit.bind(this);

		this.onClick = this.onClick.bind(this);
	};
	onChange(createGroup) {
		this.setState({ [createGroup.target.name]: createGroup.target.value });
	};

	onClick() {
		axios.post('/signout')
		  .then((response) => {
				alert(response.data.message);
				console.log(response.data);
				this.props.history.push('/')
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data);
				};
			});
	};

	onSubmit(createGroup) {
		createGroup.preventDefault();
		const groupDetails = {
			email: this.state.email,
			password: this.state.password,
			group: this.state.group
		}
		axios.post('/group', groupDetails)
		  .then((response) => {
				console.log(response.data);
				alert(this.state.group + ' group created successfully!!!');
				this.props.history.push('/broadcastboard');
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data)
				}
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
								<li><Link to="/broadcastboard">Chat Room</Link></li>
								<li className="btn" onClick={this.onClick}>Sign Out</li>
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
										<input value={this.state.group} onChange={this.onChange}
											id="groupname" type="text"
											className="form-control" placeholder="andela-abuja"
											name='group' required/>
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
