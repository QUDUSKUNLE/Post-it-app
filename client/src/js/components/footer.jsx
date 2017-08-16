import React from 'react';

/**
  * Represents Footer component.
*/
export default class Footer extends React.Component {
  /**
    *@override
   */
  render() {
    return (
      <div>
        <div className="container-fluid footie">
          <div className="container" id="post-footer">
            PostItApp
          </div>
        </div>
      </div>
    );
  }
}
