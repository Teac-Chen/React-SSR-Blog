export default (state = { count: 0, showType: 'all', list: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const list = [
        ...state.list,
        { ...action.payload },
      ];

      return {
        count: list.length,
        showType: state.showType,
        list,
      };
    }
    case 'DEL_TODO': {
      return {
        count: state.count - 1,
        showType: state.showType,
        list: state.list.filter(todo => (todo._id !== action.payload.id)),
      };
    }
    case 'TODO_CLICK': {
      return {
        count: state.count,
        showType: state.showType,
        list: state.list.map((todo) => {
          if (todo._id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      };
    }
    case 'FILTER_TODO': {
      return {
        ...state,
        showType: action.payload.type,
      };
    }
    default:
      return state;
  }
};
