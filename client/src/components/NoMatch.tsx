import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { pathname: string };

export default ({ location }: RouteComponentProps<TParams>): ReactElement => (
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
