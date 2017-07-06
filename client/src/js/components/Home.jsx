import React from 'react';
import SignUp from './userSignUp.jsx';

/**
 * Represents Home component.
 */
class Home extends React.Component {
  /**
     * @override
     */
  render() {
    return (
        <div>
          <div className="container">
						<div className="row">
							<div className='col-md-6'>
								<h4>PostIt
									<small>
										<i>App</i>
									</small>
										&nbsp;
                    allows friends to come together and share vital informtion
								</h4>
							</div>
							<SignUp/>
						</div>
					</div>
        </div>
    );
  }
}
// Export Home
export default Home;
