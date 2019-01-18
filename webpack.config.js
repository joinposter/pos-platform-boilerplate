/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var build = process.env.NODE_ENV === 'production';
/* eslint-enable */


process.argv.forEach((arg) => {
    arg = arg.split('.')[1];

    if (arg === 'p' || arg === 'production') {
        build = true;
    }
});

module.exports = {
    context: __dirname,
    entry: {
        'bundle.js': './src/js/app.js',
    },

    resolve: {
        extensions: ['.json', '.js', '.jsx', '.less'],
    },

    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name]',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
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
    devtool: build ? 'source-map' : 'eval',

    watch: !build,

    watchOptions: {
        aggregateTimeout: 100,
    },

    plugins: [],
};

if (build) {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    );
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unsafe: true,
                warnings: false,
            },
            sourceMap: true,
        }),
    );
}
