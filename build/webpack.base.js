const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const publicPath = isDev ? '/public/' : '/'

module.exports = {
  output: {
    path: path.join(__dirname, '../', '/bin/client/'),
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'views': path.join(__dirname, '../src/client/views'),
      'routes': path.join(__dirname, '../src/client/routes'),
      'components': path.join(__dirname, '../src/client/components'),
      'store': path.join(__dirname, '../src/client/store'),
      'actions': path.join(__dirname, '../src/client/actions'),
      'utils': path.join(__dirname, '../src/client/utils'),
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },{
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', "stage-1", 'env'],
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'react-hot-loader/babel'],
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
