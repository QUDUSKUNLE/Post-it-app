import React from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import SignUp from './userSignUp';



class Home extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){

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
							<SignUp/>
						</div>
					</div>
        </div>
    )
  }
};



export default Home;
