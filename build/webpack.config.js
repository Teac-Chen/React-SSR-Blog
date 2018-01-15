const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: path.join(__dirname, '../src/client/app.js')
  },
  output: {
    path: path.join(__dirname, '../', "/bin/client/"),
    filename: "[name].js",
    publicPath: ""
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/client/index.html')
    })
  ]
}

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
    publicPath: '',
    historyApiFallback: {
      index: 'index.html'
    },
    overlay: {
      errors: true
    },
    proxy: {
      '*': 'http://localhost:3000'
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
};

module.exports = config;
