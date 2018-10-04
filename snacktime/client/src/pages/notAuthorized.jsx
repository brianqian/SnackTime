import React from 'react';
import { Link } from 'react-router-dom';

const notAuthorized = () => {
  return (
    <div>
      <h1>Oops</h1>
      <p>Something went wrong... Please try logging in again</p>
      <Link to="/">Click here to login</Link>
    </div>
  );
};

export default notAuthorized;
