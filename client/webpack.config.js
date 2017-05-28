import path from 'path';
let config = {
    entry: './index.jsx',

    output: {
        path: path.join(__dirname, 'client'),
        publicPath: '/',
        filename: 'index.js',
    },

    devServer: {
        contentBase: './client',
        inline: true,
        hot: true,
        port: 8080
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