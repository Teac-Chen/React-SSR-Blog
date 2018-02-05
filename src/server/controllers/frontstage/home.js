import Todo from '../../models/todo';

export const getList = (ctx, next) => {
  ctx.body = {
    author: 'teac',
    age: 25
  };
  return next();
};

export const getInit = async (ctx, next) => {
  const list = await Todo.find({});

  ctx.initialState = {
    todos: {
      count: list.length,
      list
    }
  };
  next();
};

export const addTodo = async (ctx, next) => {
  const { text } = ctx.request.body;

  const todo = new Todo({
    index: 1,
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
