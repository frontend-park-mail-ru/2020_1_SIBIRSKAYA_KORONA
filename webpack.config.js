const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const address = require('ip').address;

const isDev = process.env.NODE_ENV === 'development';
const IP_ADDRESS = address();

module.exports = {
    mode: (isDev) ? 'development' : 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'public/js/index.js')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    resolve: {
        extensions: ['.js'],
    },

    devServer: isDev ? {
        port: 5555,
        https: true,
        host: IP_ADDRESS,
        key: fs.readFileSync(path.resolve(__dirname, 'server/credentials/test.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'server/credentials/test.crt')),
        setup: (app) => {
            app.use(morgan('dev'));
        },

        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        contentBase: [path.resolve(__dirname, 'public/dist'), path.resolve(__dirname, 'public')],

    } : {},
    devtool: isDev ? 'source-map' : '',

    module: {
        rules: [{
            test: /\.tmpl\.xml$/,
            use: [{loader: 'fest-webpack-loader'}],
        }, {
            test: /\.sass$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: isDev,
                    },
                },
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new webpack.DefinePlugin({
            'IP_ADDRESS': (isDev) ? JSON.stringify(IP_ADDRESS) : JSON.stringify('drello.works'),
        }),
        new CleanWebpackPlugin(),
        // new CopyPlugin([
        //     {
        //         from: path.resolve(__dirname, 'public/index.html'),
        //         to: path.resolve(__dirname, 'public/dist/index.html'),
        //     }, {
        //         from: path.resolve(__dirname, 'public/img'),
        //         to: path.resolve(__dirname, 'public/dist/img'),
        //     },
        // ]),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'public/js/sw.js'),
        }),
    ],
}
;
