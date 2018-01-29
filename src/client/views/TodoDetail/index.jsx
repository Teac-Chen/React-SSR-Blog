import React from 'react';
import { Helmet } from 'react-helmet';

import Test from './Test';

export default () => (
  <div>
    <Helmet>
      <title>todo detail</title>
    </Helmet>
    <Test />
  </div>
);
