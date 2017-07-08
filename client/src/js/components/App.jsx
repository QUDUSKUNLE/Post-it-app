import React from 'react';
import Navbar from './navBar.jsx';
import Home from './Home.jsx';

/**
  * Represents App Component.
*/
class App extends React.Component {
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

export default App;
