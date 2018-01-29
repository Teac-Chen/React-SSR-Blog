import React from 'react';
import { Helmet } from 'react-helmet';

import AddTodo from './AddTodo';
import TodoList from './TodoList';


export default () => (
  <div>
    <Helmet>
      <title>todo list</title>
    </Helmet>
    <AddTodo />
    <TodoList />
  </div>
);
