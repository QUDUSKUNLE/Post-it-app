import React from 'react';

/**
 * displays an error page when user navigates to an alien page
 * @function NotFound
 * @return {void} - React component
 */
const NotFound = () => (
  <div className="col-md-12" id="notFound">
    <div className="inner-content center m-auto">
      <span className="center"><img alt="loading" src="imgs/404.png" /></span>
      <h3 className="center">Page Not Found!</h3>
    </div>
  </div>
);

export default NotFound;
