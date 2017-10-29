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
    <div id="main">
      <div className="col-md-10 col-md-offset-1">
        <p className="visible-xs">
          <button
            type="button"
            className="btn btn-default btn-xs" 
            data-toggle="offcanvas">
            <i className="glyphicon glyphicon-chevron-left"></i>
          </button>
        </p>
        <div className="text-center w3-card w3-white nogroupselected">
          <div id="content">
            No Group is selected!
          </div>
        </div>
      </div>
    </div>
    );
  }
}
