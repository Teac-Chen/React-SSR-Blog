import Koa from 'koa'
// import render from 'koa-ejs';
// import path from 'path'
// import staticPath from 'koa-static';
// import mongoose from 'mongoose';

// import routers from './routers';

const app = new Koa()
const port = 3000

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/blog', {useMongoClient: true}, (err) => {
//   if(err) {
//     console.log('connect mongodb failed! Error: ', err);
//     return false
//   };
//   console.log('connect mongodb successful!!');
// });

// render(app, {
//   root: path.join(__dirname, '../client/', 'views'),
//   layout: 'front',
//   viewExt: 'html',
//   cache: false,
//   debug: false
// });

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms}ms`)
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
  ctx.body = 'Hello World!'
})

app.listen(port)

console.log(`listening on port ${port}`)
