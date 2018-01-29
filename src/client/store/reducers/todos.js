export default (state = { count: 0, list: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const count = state.count + 1;
      const list = [
        ...state.list,
        {
          index: count,
          text: action.text,
          completed: false,
        },
      ];

      return {
        count,
        list,
      };
    }
    case 'TODO_CLICK':
      return {
        count: state.count,
        list: state.list.map((todo) => {
          if (todo.index === action.index) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};
