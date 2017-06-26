import webpack from 'webpack';
import path from 'path';
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

  plugins: [
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
export default config;
