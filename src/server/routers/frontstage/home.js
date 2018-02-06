import Router from 'koa-better-router';

import * as Home from '../../controllers/frontstage/home';

const router = Router().loadMethods();

router.get('/home', (ctx, next) => {
  ctx.body = 'this is /home';
  return next();
});

router.get('/todo/list', Home.getInit);
router.post('/todo/add', Home.addTodo);
router.del('/todo/del', Home.delTodo);
router.patch('/todo/patch', Home.patchTodo);

export default router;
