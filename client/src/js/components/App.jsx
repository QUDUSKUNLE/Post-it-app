import React from 'react'
import Navbar from './NavBar'
import Home from './Home'

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
