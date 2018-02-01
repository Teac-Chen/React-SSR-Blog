import Koa from 'koa';
import favicon from 'koa-favicon';
import render from 'koa-ejs';
import staticPath from 'koa-static';
import path from 'path';
import Router from 'koa-better-router';
import ReactDomServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
// import mongoose from 'mongoose';

import routers from './routers';
import config from '../../config/config';
import serverRenderDev from './utils/server-render-dev';
import serverBundle, { createStore } from '../client/public/server-entry';

const app = new Koa();
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const isDev = process.env.NODE_ENV === 'development';

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/blog', {useMongoClient: true}, (err) => {
//   if(err) {
//     console.log('connect mongodb failed! Error: ', err);
//     return false
//   };
//   console.log('connect mongodb successful!!');
// });

render(app, {
  root: path.join(__dirname, '../client/'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

app.use(staticPath(path.join(__dirname, '../client')));

app.on('error', err => {
  console.log('server error', err);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`);
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.set('X-Origin-Add', `${host}:${port}`);
});

app.use(favicon(path.join(__dirname, '../../favicon.ico')));

Object.keys(routers.backstage).forEach(key => {
  app.use(routers.backstage[key].middleware());
});

Object.keys(routers.frontstage).forEach(key => {
  app.use(routers.frontstage[key].middleware());
});

if (isDev) {
  serverRenderDev(app);
} else {
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

  app.use(router.middleware());
}

app.listen(port);

console.log(`listening on port ${host}:${port}`);
