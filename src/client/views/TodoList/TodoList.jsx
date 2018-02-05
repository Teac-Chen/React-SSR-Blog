import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const action = {
  todoClick: index => ({
    type: 'TODO_CLICK',
    index,
  }),
};

const TodoList = ({ todos, todoClick }) => (
  <ul>
    <li>{todos.length}</li>
    {todos.map(item => (
      <li
        key={item._id}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => todoClick(item.index)}
        role="presentation"
        aria-hidden
      >
        {item.index}-
        <span
          style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
        >
          {item.text}
        </span>
        -{new Date(item.meta.updateAt).getTime()}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    _id: PropTypes.any.isRequired,
  }).isRequired).isRequired,
  todoClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.list,
});

const mapDispatchToProps = dispatch => ({
  todoClick: index => dispatch(action.todoClick(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
