import React from 'react';
import { Redirect } from 'react-router-dom';
import UserSignUp from './UserSignUp';

/**
 * @export Home component
 * @description - Home Component
 * @return {Home} component
 */
const Home = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated) {
    return (
      <Redirect to="/broadcastboard" />
    );
  }
  return (
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
        <UserSignUp />
      </div>
    </div>
  );
};

export default Home;
