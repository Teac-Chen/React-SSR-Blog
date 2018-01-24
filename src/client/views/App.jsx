import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import store from 'store';
import routes from 'routes';

export default () => (
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Link to="/">home</Link>
        <br />
        <Link to="/todo/list">list</Link>
        <br />
        <Link to="/todo/detail">detail</Link>
        {
          routes.map(route => (
            route.redirect ?
              <Route
                key={route.url}
                path={route.url}
                render={() => <Redirect to={route.redirect} />}
                exact={route.exact === true}
              /> :
              <Route
                key={route.url}
                path={route.url}
                component={route.component}
                exact={route.exact === true}
              />
          ))
        }
      </div>
    </BrowserRouter>
  </Provider>
);
