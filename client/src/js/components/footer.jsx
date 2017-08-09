import React from 'react';

class Footer extends React.Component {
  /**
    *@override
   */
  render(){
    return (
      <div>
        <div className='container-fluid footie'>
          <div className='container' id='post-footer'>
            PostItApp
          </div>
        </div>
      </div>
    );
  }
}

export default Footer; // Export Footer
