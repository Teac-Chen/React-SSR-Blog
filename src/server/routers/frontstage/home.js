import Router from 'koa-better-router';

import * as Home from '../../controllers/frontstage/home';

const router = Router().loadMethods();

router.get('/home', (ctx, next) => {
  ctx.body = 'this is /home';
  return next();
});

router.get('/todo/list', Home.getInit);
router.post('/todo/add', Home.addTodo);

export default router;
