import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'views/App';
import store from 'store';

const render = (Component) => {
  ReactDOM.render(
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
