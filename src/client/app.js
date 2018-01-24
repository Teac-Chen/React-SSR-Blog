import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'views/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
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
