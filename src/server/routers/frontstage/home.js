import Router from 'koa-better-router';

const router = Router().loadMethods();

router.get('/home', (ctx, next) => {
  ctx.body = 'this is /home';
  return next();
});

router.get('/todo/list', (ctx, next) => {
  ctx.initialState = 'todoList';
  next();
});

export default router;
