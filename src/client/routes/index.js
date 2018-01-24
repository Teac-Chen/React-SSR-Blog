import TodoList from 'views/TodoList';
import TodoDetail from 'views/TodoDetail';

export default [
  { url: '/', redirect: '/todo/list', exact: true },
  { url: '/todo/list', component: TodoList },
  { url: '/todo/detail', component: TodoDetail },
];
