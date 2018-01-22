import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

// import todoApp from './demo/reducers';
// import App from './demo/components/App';
import App from './views/App';

// const store = createStore(todoApp);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
