import qs from 'qs';

import Todo from '../../models/todo';

export const getInit = async (ctx, next) => {
  const list = await Todo.find({});

  ctx.initialState = {
    todos: {
      count: list.length,
      showType: 'all',
      list
    }
  };
  next();
};

export const addTodo = async (ctx, next) => {
  const { text } = ctx.request.body;

  const todo = new Todo({
    text
  });

  const item = await todo.save();

  ctx.body = {
    code: 0,
    data: item,
    msg: 'success'
  };

  next();
};

export const delTodo = async (ctx, next) => {
  const { id } = ctx.request.body;

  await Todo.deleteOne({ _id: id });

  ctx.body = {
    code: 0,
    data: { id },
    msg: 'success'
  };

  next();
};

export const patchTodo = async (ctx, next) => {
  const { id } = qs.parse(ctx.request.body);

  const todo = await Todo.findById(id);

  todo.completed = !todo.completed;

  await todo.save();

  ctx.body = {
    code: 0,
    data: { id },
    msg: 'success'
  };

  next();
};
