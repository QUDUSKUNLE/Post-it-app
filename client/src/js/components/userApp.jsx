import React from 'react'
import Navbar from './navBar.jsx'
import Home from './Home.jsx'

class App extends React.Component {
  render(){
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    )
  }
};

export default App;
