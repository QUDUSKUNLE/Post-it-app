import React from 'react';

/**
 * @export
 * @description - renders Footer Component
 * @class NoGroupSelected
 * @extends {React.Component}
 */
export default class NoGroupSelected extends React.Component {
  render() {
    return (
      <div className="text-center w3-card w3-white nogroupselected">
        <div id="content">
          No Group is selected!
        </div>
      </div>
    );
  }
}
