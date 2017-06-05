import React from 'react';

class ComponentItems extends React.Component {
	render() {
		let img = 'assets/images/download.jpg';
		let item = (
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-md-offset-6">
						<ul className="list-unstyled list-inline pull-right">
							<li><a href="#">Sign Up</a></li>
							<li><a href="#">Sign In</a></li>
							<li><a href="#">Create Group</a></li>
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-12">
								<b><i>Connect with friends and share information</i></b>
							</div>
							<div className="col-md-12">
								<img src={img} className="img-responsive" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);

		return (
			<div>
				{item}
			</div>

		);
	}
};
export default ComponentItems;
