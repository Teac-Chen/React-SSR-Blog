import { createStore, combineReducers } from 'redux';
import todos from './reducers/todos';

const combineReducer = combineReducers({
  todos,
});

export default initState => createStore(combineReducer, initState);
