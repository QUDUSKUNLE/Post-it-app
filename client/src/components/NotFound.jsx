import React from 'react';
import { Link } from 'react-router-dom';

/**
 * displays an error page when user navigates to an alien page
 * @function NotFound
 * @return {void} - React component
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
