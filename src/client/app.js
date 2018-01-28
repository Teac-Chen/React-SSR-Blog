import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'views/App';
import createStore from 'store';

const initState = window.__INITIAL_STATE__ || {};
const store = createStore(initState);

store.subscribe(() => { console.log(store.getState()) }); //eslint-disable-line

const render = (Component) => {
  // ReactDOM.render(
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store} >
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    render(require('./views/App').default);  //eslint-disable-line
  });
}
