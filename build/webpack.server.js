const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies)
}
