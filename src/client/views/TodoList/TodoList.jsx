import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { delTodo, patchTodo } from 'actions/todos';

const TodoList = ({ todos, type, todoClick, del }) => {
  let showList;
  switch (type) {
    case 'active': {
      showList = todos.filter(todo => !todo.completed);
      break;
    }
    case 'completed': {
      showList = todos.filter(todo => todo.completed);
      break;
    }
    default: {
      showList = todos;
      break;
    }
  }

  return (
    <ul>
      <li>{showList.length}-{type}</li>
      {showList.map((item, index) => (
        <li
          key={item._id}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => todoClick(item._id)}
          role="presentation"
          aria-hidden
        >
          {index + 1}-
          <span
            style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
          >
            {item.text}
          </span>
          -{new Date(item.meta.createAt).getTime()}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              del(item._id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    _id: PropTypes.any.isRequired,
  }).isRequired).isRequired,
  type: PropTypes.string.isRequired,
  todoClick: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.list,
  type: state.todos.showType,
});

const mapDispatchToProps = dispatch => ({
  todoClick: id => patchTodo(dispatch, id),
  del: id => delTodo(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
