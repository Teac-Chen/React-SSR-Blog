import Router from 'koa-better-router';

import * as Home from '../../controllers/backstage/home';

const router = Router({prefix: '/admin'}).loadMethods();

router.get('/home', Home.getData);

export default router;
