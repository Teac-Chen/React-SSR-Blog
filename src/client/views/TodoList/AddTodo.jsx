import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addTodo } from 'actions/todos';

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
  add: text => addTodo(dispatch, text),
});

export default connect(null, mapDispatchToProps)(AddTodo);
