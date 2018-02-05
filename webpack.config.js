'use strict';
var path = require("path");

var build = process.env.NODE_ENV === 'production';

module.exports = {
	context: __dirname,
	entry: {
		'bundle.js': "./src/js/app.js"
	},

	output: {
		path: path.resolve(__dirname, './'),
		filename: "[name]"
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader?cacheDirectory',
				exclude: [
                    __dirname + '/node_modules',
                    __dirname + '\\node_modules'
				],

				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			}, {
				test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
				]
			}, {
				test: /\.less/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
				]
			}
		]
	},

	devtool: 'source-map',

	watch: !build,

	watchOptions: {
		aggregateTimeout: 100
	},

	plugins: [
	],
};


