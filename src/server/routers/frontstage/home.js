import Router from 'koa-better-router';

const router = Router().loadMethods();

router.get('/home', async (ctx, next) => {
  ctx.body = 'this is /home';
  return next();
});

export default router;
