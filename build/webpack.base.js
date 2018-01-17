const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx']
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
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
