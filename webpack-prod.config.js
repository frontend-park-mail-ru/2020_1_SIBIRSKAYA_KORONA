const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const path = require('path');

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'public/js/index.js')],
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js'],
    },


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
                        hmr: false,
                        reloadAll: false,
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'IP_ADDRESS': JSON.stringify('drello.works'),
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'public/img'),
                to: path.resolve(__dirname, 'public/dist/img'),
            },
        ]),
        new HtmlWebpackPlugin({
            template: 'public/index_template.html',
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'public/js/sw.js'),
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
        }),
    ],
}
;
