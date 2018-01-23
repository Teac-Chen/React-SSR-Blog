import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const action = {
  todoClick: id => ({
    type: 'TODO_CLICK',
    id,
  }),
};

const TodoList = ({ todos, todoClick }) => (
  <ul>
    {todos.map(item => (
      <li
        key={item.id}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => todoClick(item.id)}
        role="presentation"
        aria-hidden
      >
        {item.id}-<span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}</span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  todoClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  todoClick: id => dispatch(action.todoClick(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
