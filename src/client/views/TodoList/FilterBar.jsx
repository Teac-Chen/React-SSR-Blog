import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterTodo } from 'actions/todos';

const FilterBar = ({ filter }) => (
  <div>
    <button type="button" onClick={() => filter('all')}>ALL</button>
    <button type="button" onClick={() => filter('active')}>ACTIVE</button>
    <button type="button" onClick={() => filter('completed')}>COMPLETED</button>
  </div>
);

FilterBar.propTypes = {
  filter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  filter: type => filterTodo(dispatch, type),
});

export default connect(null, mapDispatchToProps)(FilterBar);
