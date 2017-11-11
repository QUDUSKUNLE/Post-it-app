import React from 'react';
import UserSignUp from './UserSignUp.jsx';


/**
 * @export Home component
 * @description - Home Component
 * @return {Home} component
 */
const Home = () =>
 (
    <div className="container-fluid mainbody">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h4>PostIt
                {' '}
                allows friends come together and share vital information.
              </h4>
            </div>
          </div>
        </div>
        <UserSignUp/>
      </div>
    </div>
  );

export default Home;
