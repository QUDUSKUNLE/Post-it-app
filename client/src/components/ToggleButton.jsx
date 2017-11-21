import React from 'react';
import $ from 'jquery';

/**
 * @export Footer component
 * @description - Footer Component
 * @return {object} ToggleButton component
 */
const ToggleButton = () =>
  (<div>
    <p className="visible-xs">
      <button
        type="button"
        className="btn btn-default btn-xs off-canvas"
        data-toggle="offcanvas"
        onClick={() => {
          if ($('.row-offcanvas').attr('class').indexOf('active') === -1) {
            $('.row-offcanvas').addClass('active');
          } else {
            $('.row-offcanvas').removeClass('active');
          }
        }}
      >
        <i className="glyphicon glyphicon-chevron-left"></i>
      </button>
    </p>
  </div>
  );

export default ToggleButton;
