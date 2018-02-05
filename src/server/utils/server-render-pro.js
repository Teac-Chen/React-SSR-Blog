import Router from 'koa-better-router';
import ReactDomServer from 'react-dom/server';
import { Helmet } from 'react-helmet';

import serverBundle, { createStore } from '../../client/public/server-entry';

const router = Router().loadMethods();

router.get('*', async (ctx, next) => {
  if (!ctx.body) {
    const context = {};
    const store = createStore(ctx.initialState);

    const app = serverBundle(store, context, ctx.url);

    const content = ReactDomServer.renderToString(app);

    if (context.url) {
      ctx.status = 301;
      ctx.redirect(context.url);

      return next();
    }

    const initialState = ctx.initialState || {};
    const helmet = Helmet.renderStatic();

    await ctx.render('server', {
      appString: content,
      initialState: JSON.stringify(initialState),
      title: helmet.title.toString()
    });

    return next();
  }
});

export default router;
