import React from 'react';
import UserSignUp from './UserSignUp';


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
          <div classNmae="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="word">
                <h4>PostIt
                <small>
                    <i>App</i>
                  </small>
                  {' '}
                  allows friends come together and share vital information.
              </h4>
              </div>
            </div>
          </div>
        </div>
        <UserSignUp/>
      </div>
    </div>
  );

export default Home;
