import React from 'react';
import ToggleButton from './ToggleButton';
/**
 * @export NoGroupSelected component
 * @description - NoGroupSelected Component
 * @return {NoGroupSelected} component
 */
const NoGroupSelected = () =>
  (
  <div className="main">
    <div className="col-md-10 col-md-offset-1">
      <ToggleButton />
      <div className="text-center w3-card w3-white nogroupselected">
        <p id="content">
        Please select a group to send message or create one
        </p>
      </div>
    </div>
  </div>
  );

export default NoGroupSelected;
