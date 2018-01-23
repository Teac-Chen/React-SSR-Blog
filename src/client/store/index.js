import { createStore, combineReducers } from 'redux';
import todos from './reducers/todos';

const combineReducer = combineReducers({
  todos,
});

const store = createStore(combineReducer);

store.subscribe(() => { console.log(store.getState()) }); //eslint-disable-line

export default store;
