'use strict';
var path = require("path");

module.exports = {
	context: __dirname,
	entry: {
		'bundle.js': "./src/app.js"
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
				],
				include: [
					__dirname + '/src'
				],

				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			}
		]
	},

	devtool: 'source-map',

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	plugins: [
	]
};


