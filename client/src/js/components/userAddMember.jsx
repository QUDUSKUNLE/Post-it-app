import React from 'react';
import {Link} from 'react-router-dom';

class AddMember extends React.Component {
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
								<li><Link to="/">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </div>
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
    )
  }
};

export default AddMember;