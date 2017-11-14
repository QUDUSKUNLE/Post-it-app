import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @export NotFound component
 * @description NotFound component
 * @return {NotFound} component
 */
const NotFound = () => (
  <div className="notFound">
    <div className="page">PAGE NOT FOUND!!!</div>
    <div className="text-center" id="let">Let's go back
      <span id="homeLink"><Link to="/signin"> Home</Link></span>
    </div>
  </div>
);

export default NotFound;
