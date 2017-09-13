import React from 'react';

/**
  * Represents Footer component.
*/
export default class Footer extends React.Component {
  /**
   * @description - render method, React lifecycle method
   * @returns {Object} Footer component
   * @Footer
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
