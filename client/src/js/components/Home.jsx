import React from 'react';
import axios from 'axios';
import SignUp from './UserSignUp'
import PropTypes from 'prop-types'
// import AppActions from '../actions/AppActions';
// import AppStore from '../stores/AppStore'
import { connect } from 'react-redux';
import SignUpUser from '../actions/AppActions'

class Home extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const { SignUpUser } = this.props;
    return(
        <div>
          <div className="container">
						<div className="row">
							<div className='col-md-6'>
								<p>PostIt
									<small>
										<i>App</i>
									</small>
										&nbsp;allows friends to come together and share vital informtion
								</p>
							</div>
							<SignUp  SignUpUser={ SignUpUser } />
						</div>
					</div>
        </div>
    )
  }
};

Home.propTypes = {
  SignUpUser: PropTypes.func.isRequired
};

export default connect((state) => { return {}}, { SignUpUser })(Home);
