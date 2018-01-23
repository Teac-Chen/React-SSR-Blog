import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let id = 0;

const addTodo = (text) => {
  const action = {
    type: 'ADD_TODO',
    id,
    text,
  };

  id += 1;

  return action;
};

const AddTodo = ({ add }) => {
  let input;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!input.value.trim()) return;

        add(input.value);

        input.value = '';
      }}
    >
      <input ref={(node) => { input = node; }} />
      <button type="submit">ADD</button>
    </form>
  );
};

AddTodo.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  add: text => dispatch(addTodo(text)),
});

export default connect(null, mapDispatchToProps)(AddTodo);
