import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'views/App';
import createStore from 'store';

export default (storeSsr, routerContext, url) => {
  console.log(storeSsr.getState()); //eslint-disable-line
  return (
    <Provider store={storeSsr}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export { createStore };
