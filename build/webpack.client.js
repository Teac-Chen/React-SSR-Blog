const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base');

const isDev = process.env.NODE_ENV === 'development';

const config = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../src/client/app.js')
  },
  output: {
    filename: "public/[name].[hash].js"
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
      filename: 'template.html'
    }),
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../src/client/server.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../src/client/app.js')
    ]
  };
  config.devServer = {
    host: '0.0.0.0',
    compress: true,
    port: 4000,
    hot: true,
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    overlay: {
      errors: true
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  config.entry = {
    app: path.join(__dirname, '../src/client/app.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
      'react-helmet',
      'axios',
    ]
  };
  config.output.filename = "public/[name].[chunkhash].js";
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    })
  )
}

module.exports = config;
