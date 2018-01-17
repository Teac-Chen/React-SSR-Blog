const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  },
  // externals: Object.keys(require('../package.json').dependencies)
})
