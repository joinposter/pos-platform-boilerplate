/* eslint-disable */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
/* eslint-enable */

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

module.exports = (env) => {
    const MODE = (env.p || env.production) ? PRODUCTION : DEVELOPMENT;

    let commonConfig = {
        context: __dirname,
        mode: MODE,
        entry: {
            bundle: './src/js/app.js',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.less'],
            fallback: {
                fs: false,
                timers: false,
                util: false,
                http: false,
                stream: require.resolve('stream-browserify'),
                os: require.resolve('os-browserify/browser'),
            },
        },

        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name].js',
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, './src'),
                        path.resolve(__dirname, './examples'),
                    ],
                    options: {
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                    ],
                },
                {
                    test: /\.less/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' },
                    ],
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    loader: 'url-loader',
                },
            ],
        },

        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
    };

    if (MODE === DEVELOPMENT) {
        commonConfig = merge(commonConfig, {
            devtool: 'eval',
            watchOptions: {
                aggregateTimeout: 100,
            },
        });
    } else {
        commonConfig = merge(commonConfig, {
            devtool: 'source-map',
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin(),
                ],
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(PRODUCTION),
                }),
            ],
        });
    }

    return commonConfig;
};
