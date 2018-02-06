import React from 'react';
import { Helmet } from 'react-helmet';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import FilterBar from './FilterBar';


const Todo = () => (
  <div>
    <Helmet>
      <title>todo list</title>
    </Helmet>
    <AddTodo />
    <TodoList />
    <FilterBar />
  </div>
);

export default Todo;
