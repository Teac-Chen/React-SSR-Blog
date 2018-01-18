import axios from 'axios';
import path from 'path';
import MemoryFileSystem from 'memory-fs';
import webpack from 'webpack';
import Router from 'koa-better-router';
import proxy from 'koa-proxies';
// import NativeModule from 'module';
// import vm from 'vm';
import ReactDomServer from 'react-dom/server';

import webpackServerConfig from '../../../build/webpack.server';

const Module = module.constructor;

const mfs = new MemoryFileSystem();
const serverCompiler = webpack(webpackServerConfig);

let serverBundle;
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
        const content = ReactDomServer.renderToString(serverBundle);

        ctx.body = template.replace('<!--app-->', content);
      });
    }
    return next();
  });

  app.use(router.middleware());
};
