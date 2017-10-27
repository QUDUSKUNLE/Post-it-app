import React from 'react';
import UserSignUp from './UserSignUp';


/**
 * @description - renders App Component
 * @class App
 */
export default class UserApp extends React.Component {

  render() {
   /**
   * @description - render method, React lifecycle method
   * @returns {*} UserApp component
   */
    return (
      <div className="container mainbody">
        <div className="row home">
          <div className="col-md-6">
            <h4>PostIt
              <small>
                <i>App</i>
              </small>
                {' '}
                allows friends to come together and share vital information.
            </h4>
          </div>
          <UserSignUp/>
        </div>
      </div>
    );
  }
}
