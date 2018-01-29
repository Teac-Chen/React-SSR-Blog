import Router from 'koa-better-router';

const router = Router().loadMethods();

router.get('/home', (ctx, next) => {
  ctx.body = 'this is /home';
  return next();
});

router.get('/todo/list', (ctx, next) => {
  ctx.initialState = {
    todos: {
      count: 2,
      list: [{
        index: 1,
        completed: false,
        text: 'check the detail'
      }, {
        index: 2,
        completed: false,
        text: 'make dinner'
      }]
    }
  };
  next();
});

export default router;
