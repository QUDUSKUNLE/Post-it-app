import React from 'react';
import Navbar from './navBar.jsx';
import SignUp from './userSignUp.jsx';
// import Home from './Home.jsx';

/**
  * Represents App Component.
*/
export default class App extends React.Component {
  /**
    * @override
  */
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row home">
            <div className="col-md-6">
              <h4>PostIt
                <small>
                  <i>App</i>
                </small>
                    &nbsp;
                  allows friends to come together and share vital informtion.
              </h4>
            </div>
            <SignUp/>
          </div>
        </div>
      </div>
    );
  }
}
