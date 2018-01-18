const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../', "/bin/client/"),
    publicPath: "/public/"
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
          path.join(__dirname, '../node_modules')
        ]
      },{
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', "stage-1", 'env'],
          plugins: ['transform-decorators-legacy', 'react-hot-loader/babel']
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
