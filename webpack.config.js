const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: [
    'webpack-hot-middleware/./client',
    './client/src/js/index.jsx'
  ],
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'client/src'),
    publicPath: '/',
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/src'),
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
module.exports = config;
