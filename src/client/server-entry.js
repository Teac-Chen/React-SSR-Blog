import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'views/App';
import store from 'store';

export default (storeSsr, context, url) => (
  <Provider store={storeSsr}>
    <StaticRouter context={context} location={url}>
      <App />
    </StaticRouter>
  </Provider>
);

export { store };
