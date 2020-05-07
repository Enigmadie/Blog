import React from 'react';

export default ({ location }) => (
  <div className="no-match">
    <h1>404</h1>
    <h3>
      No match for
      <code>
        {location.pathname}
      </code>
    </h3>
  </div>
);
