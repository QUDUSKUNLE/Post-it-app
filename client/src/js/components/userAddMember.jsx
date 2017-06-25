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
        // console.log(response.data);
        this.props.history.push('/')
			})
			.catch((error) => {
				if (error.response) {
					// console.log(error.response.data);
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
        // console.log(response.data);
        alert(response.data.message);
        this.props.history.push('/broadcastboard')
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
        }
      })
  };


  render(){
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
                <span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
                PostIt<small>App</small>
              </Link>
						</div>
						<div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
                <li className="active"><Link to="">AddMember</Link></li>
                <li><Link to="/broadcastboard">Chat Room</Link></li>
								<li onClick={this.onClick}><Link to="">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
      </div>
    )
  }
};

export default AddMember;
