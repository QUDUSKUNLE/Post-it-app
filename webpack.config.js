const webpack = require('webpack');

const path = require('path');
let config = {
    entry: [
        './client/src/js/index.jsx'
    ],

    output: {
        path: path.join(__dirname, 'client/src'),
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}

module.exports = config;