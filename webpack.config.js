'use strict';
var path = require("path");

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
				],
				include: [
					__dirname + '/src',
                    __dirname + '\\src'
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

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	plugins: [
	]
};


