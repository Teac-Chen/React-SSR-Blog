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
    filename: "[name].[hash].js"
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/client/index.html')
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
};

module.exports = config;
