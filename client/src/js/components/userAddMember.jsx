import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      group: '',
      member: ''

    };
    // bind the input values
    this.onChange = this.onChange.bind(this);

    // onSubmit events
    this.onSubmit = this.onSubmit.bind(this);

    // Sign out
    this.onClick = this.onClick.bind(this);
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

  onChange(addmember) {
    this.setState({
      [addmember.target.name]: addmember.target.value
    });
  };

  onSubmit(addmember) {
    addmember.preventDefault();
    const memberDetails = {
      email: this.state.email,
      password: this.state.password,
      group: this.state.group,
      member: this.state.member
    };
    axios.post('/group/member', memberDetails)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        this.props.history.push('/broadcastboard')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      })
  };


  render(){
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
						<div className="col-md-6 col-md-offset-3">
							<form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input value={this.state.email} onChange={this.onChange}
                    id="email" type="email"
                    className="form-control" placeholder="johndoe@example.com"
                    name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password"
                    value={this.state.password} onChange={this.onChange}
                    className="form-control" placeholder="*********"
                    name="password" required />
                </div>
								<div className="form-group">
                  <label htmlFor="group">Group Name</label>
									<input value={this.state.group} onChange={this.onChange}
                    type="text" name="group" className="form-control"
                    placeholder="groupname" required />
								</div>
                <div className="form-group">
                  <label htmlFor="member">Member</label>
									<input value={this.state.member} onChange={this.onChange}
                    type="text" name="member" className="form-control"
                    placeholder="member" required />
								</div>
								<button type="submit" className="btn btn-success form-control">Add To Group</button>
							</form>
						</div>
					</div>
				</div>
      </div>
    )
  }
};

export default AddMember;
