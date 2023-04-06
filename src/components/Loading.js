import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="Loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
