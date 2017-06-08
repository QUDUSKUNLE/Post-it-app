const webpack = require('webpack');

const path = require('path');
let config = {
    entry: './client/build/index.jsx',

    output: {
        path: path.join(__dirname, 'client/build'),
        publicPath: '/',
        filename: 'index.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}

module.exports = config;