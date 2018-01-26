import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'views/App';
import store from 'store';

export default (storeSsr, routerContext, url) => (
  <Provider store={storeSsr}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
);

export { store };
