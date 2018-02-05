export default (state = { count: 0, list: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const list = [
        ...state.list,
        { ...action.payload },
      ];

      return {
        count: list.length,
        list,
      };
    }
    case 'TODO_CLICK':
      return {
        count: state.count,
        list: state.list.map((todo) => {
          if (todo._id === action.index) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};
