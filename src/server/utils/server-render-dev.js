import axios from 'axios';
import path from 'path';
import MemoryFileSystem from 'memory-fs';
import webpack from 'webpack';
import Router from 'koa-better-router';
import proxy from 'koa-proxies';
import ReactDomServer from 'react-dom/server';
import ejs from 'ejs';
import NativeModule from 'module';
import vm from 'vm';
import { Helmet } from 'react-helmet';

import webpackServerConfig from '../../../build/webpack.server';

// const Module = module.constructor;

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
};

const mfs = new MemoryFileSystem();
const serverCompiler = webpack(webpackServerConfig);

let serverBundle, createStore;
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;

  stats = stats.toJson();
  stats.errors.forEach(err => console.error('webpack err ===> ', err));
  stats.warnings.forEach(warn => console.warn('webpack warn ===> ', warn));

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');

  // const m = new Module();
  // m._compile(bundle, 'server-entry.js');
  const m = getModuleFromString(bundle, 'server-entry.js');

  serverBundle = m.exports.default;
  createStore = m.exports.createStore;
});

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:4000/public/server.ejs')
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
    if (!serverBundle) {
      ctx.body = '页面正在维护中，清稍后！';
      return next();
    }

    if (!ctx.body) {
      let template = await getTemplate();

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

      const html = ejs.render(template, {
        appString: content,
        initialState: JSON.stringify(initialState),
        title: helmet.title.toString()
      });

      ctx.body = html;
    }
    return next();
  });

  app.use(router.middleware());
};
