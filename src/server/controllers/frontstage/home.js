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
  console.log(ctx.request);
  console.log(ctx.request.query);

  const todo = new Todo({
    index: 1,
    text: 'heihei'
  });

  await todo.save();

  ctx.body = {
    code: 0,
    msg: 'success'
  };

  next();
};
