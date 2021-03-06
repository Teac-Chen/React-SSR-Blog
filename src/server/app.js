import Koa from 'koa';
import favicon from 'koa-favicon';
import render from 'koa-ejs';
import staticPath from 'koa-static';
// import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import mongoose from 'mongoose';

import routers from './routers';
import config from '../../config/config';
import serverRenderDev from './utils/server-render-dev';
import serverRenderPro from './utils/server-render-pro';

const app = new Koa();
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
const isDev = process.env.NODE_ENV === 'development';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog', (err) => {
  if (err) {
    console.log('connect mongodb failed! Error: ', err);
    return false;
  };
  console.log('connect mongodb successful!!');
});

render(app, {
  root: path.join(__dirname, '../client/'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

app.use(bodyParser()).use(staticPath(path.join(__dirname, '../client')));

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
  app.use(serverRenderPro.middleware());
}

app.listen(port);

console.log(`listening on port ${host}:${port}`);
