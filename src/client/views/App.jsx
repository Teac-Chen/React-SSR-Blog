import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import TodoList from './TodoList';

export default () => (
  <Provider store={store} >
    <TodoList />
  </Provider>
);
