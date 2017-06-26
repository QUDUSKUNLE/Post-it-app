import React from 'react';
import Navbar from './navBar.jsx';
import Home from './Home.jsx';

/**
 * App component.
 * @returns {App} component.
 */
class App extends React.Component {
  /**
	 * render App.
	 * @returns {render} App Component.
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
