import Koa from 'koa';
import favicon from 'koa-favicon';
import render from 'koa-ejs';
import path from 'path';
// import mongoose from 'mongoose';

import routers from './routers';
import config from '../../config/config';
import serverRenderDev from './utils/server-render-dev';

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
  viewExt: 'ejs',
  cache: false,
  debug: false
});

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
}

app.listen(port);

console.log(`listening on port ${host}:${port}`);
