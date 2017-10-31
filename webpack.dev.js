const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/src',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
