import qs from 'qs';
import { fetchPost, fetchDel, fetchPatch } from 'utils/fetch';

export const addTodo = async (dispatch, text) => {
  const item = await fetchPost('/todo/add', qs.stringify({ text }));

  const action = {
    type: 'ADD_TODO',
    payload: { ...item.data.data },
  };

  dispatch(action);
};

export const delTodo = async (dispatch, id) => {
  const item = await fetchDel('/todo/del', qs.stringify({ id }));

  const action = {
    type: 'DEL_TODO',
    payload: { ...item.data.data },
  };

  dispatch(action);
};

export const patchTodo = async (dispatch, id) => {
  const item = await fetchPatch('/todo/patch', qs.stringify({ id }));

  const action = {
    type: 'TODO_CLICK',
    payload: { ...item.data.data },
  };

  dispatch(action);
};

export const filterTodo = (dispatch, type) => {
  const action = {
    type: 'FILTER_TODO',
    payload: { type },
  };

  dispatch(action);
};
