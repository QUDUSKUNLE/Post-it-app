import React from 'react';
import Navbar from './navBar.jsx';
import Home from './Home.jsx';

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
        <Home />
      </div>
    );
  }
}
