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
    const img = 'https://www.google.com.ng/search?q=share+information+image&';
    return (
        <div>
          <div className="container">
						<div className="row home">
							<div className='col-md-6'>
								<h4>PostIt
									<small>
										<i>App</i>
									</small>
										&nbsp;
                    allows friends to come together and share vital informtion.
								</h4>
                <img src={img} alt=''/>
							</div>
							<SignUp/>
						</div>
					</div>
        </div>
    );
  }
}

export default Home; // Export Home
