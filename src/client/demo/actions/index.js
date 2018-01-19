let nextTodoId = 0;

export const addTodo = (text) => {
  const state = {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };

  nextTodoId += 1;

  return state;
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
