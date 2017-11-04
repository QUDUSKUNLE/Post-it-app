import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @export NotFound component
 * @description NotFound component
 * @return {NotFound} component
 */
const NotFound = () => (
  <div className="col-md-12">
    <div className="inner-content center m-auto">
      <h3 className="text-center">Page Not Found.</h3>
      <Link to="/signin">Go Back</Link>
    </div>
  </div>
);

export default NotFound;
