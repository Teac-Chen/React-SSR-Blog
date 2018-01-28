export default (state = { count: 0, list: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const list = [
        ...state.list,
        {
          index: state.count,
          text: action.text,
          completed: false,
        },
      ];
      const count = state.count + 1;

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
