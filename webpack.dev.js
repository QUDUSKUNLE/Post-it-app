const merge = require('webpack-merge');
const common = require('./webpack.common.js');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/src'
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    })
  ]
});
