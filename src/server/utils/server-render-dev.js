import axios from 'axios';
import path from 'path';
import MemoryFileSystem from 'memory-fs';
import webpack from 'webpack';
import Router from 'koa-better-router';
import proxy from 'koa-proxies';
import ReactDomServer from 'react-dom/server';

import webpackServerConfig from '../../../build/webpack.server';

const Module = module.constructor;

const mfs = new MemoryFileSystem();
const serverCompiler = webpack(webpackServerConfig);

let serverBundle, store;
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;

  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');

  const m = new Module();
  m._compile(bundle, 'server-entry.js');
  serverBundle = m.exports.default;
  store = m.exports.store;
});

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:4000/public/index.html')
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};

export default (app) => {
  const router = Router().loadMethods();

  app.use(proxy('/public', {
    target: 'http://localhost:4000',
    logs: true
  }));

  router.get('*', async (ctx, next) => {
    if (!ctx.body) {
      await getTemplate().then(template => {
        if (!serverBundle) {
          ctx.body = 'wait for server compile!';
        } else {
          const routerContext = { flag: true };
          const app = serverBundle(store, routerContext, ctx.url);

          console.log('server-render-dev ===> ', routerContext);

          // if (ctx.url === '/') {
          //   ctx.status = 302;
          //   ctx.redirect('/todo/list');

          //   return;
          // }

          const content = ReactDomServer.renderToString(app);

          ctx.body = template.replace('<!--app-->', content);
        }
      });
    }
    return next();
  });

  app.use(router.middleware());
};
