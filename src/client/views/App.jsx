import React from 'react';
import {
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import routes from 'routes';

export default () => [
  <Link to="/" key="linkHome">home</Link>,
  <br key="br1" />,
  <Link to="/todo/list" key="linkList">list</Link>,
  <br key="br2" />,
  <Link to="/todo/detail" key="linkDetail">detail</Link>,
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
  )),
];
