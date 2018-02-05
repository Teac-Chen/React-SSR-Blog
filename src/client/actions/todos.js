import axios from 'axios';

export const addTodo = async (count, action) => {
  const todo = await axios.post('/todo/add', {
    count,
    action,
  });

  console.log('addTodo ===> ', todo.data); //eslint-disable-line

  return todo;
};

export const clickTodo = () => {
  const todo = {};
  if (process.env.NODE_ENV === 'development') {
    todo.index = 0;
  }
  return todo;
};
