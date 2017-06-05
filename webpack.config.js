const path = require('path');
let config = {
    entry: './Client/index.jsx',

    output: {
        path: path.join(__dirname, 'Client'),
        publicPath: '/',
        filename: 'index.js',
    },

    devServer: {
        contentBase: './Client',
        inline: true,
        hot: true,
        port: 7777
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
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}

module.exports = config;