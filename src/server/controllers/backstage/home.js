export const getData = (ctx, next) => {
  ctx.body = {
    author: 'teac',
    age: 25
  };
  return next();
};
