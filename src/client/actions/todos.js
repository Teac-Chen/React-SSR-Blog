import qs from 'qs';
import { fetchPost } from 'utils/fetch';

export const addTodo = async (dispatch, text) => {
  const item = await fetchPost('/todo/add', qs.stringify({
    text,
  }));

  const action = {
    type: 'ADD_TODO',
    payload: { ...item.data.data },
  };

  dispatch(action);
};

export const clickTodo = () => {
  const todo = {};
  if (process.env.NODE_ENV === 'development') {
    todo.index = 0;
  }
  return todo;
};
