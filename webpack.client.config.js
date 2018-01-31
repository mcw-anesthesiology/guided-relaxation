const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const cssnext = require('postcss-cssnext');

const isDev = config.dev;

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.html'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						forceEnv: 'client'
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							forceEnv: 'client'
						}
					},
					{
						loader: 'svelte-loader',
						options: {
							hydratable: true,
							emitCss: !isDev,
							cascade: false,
							store: true
						}
					}
				]
			},
			isDev && {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							minimize: false,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								cssnext()
							]
						}
					}
				]
			},
			!isDev && {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								sourceMap: false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									cssnext()
								]
							}
						}
					]
				})
			}
		].filter(Boolean)
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			minChunks: 2,
			async: false,
			children: true
		})
	].concat(isDev ? [
		new webpack.HotModuleReplacementPlugin()
	] : [
		new ExtractTextPlugin('../../assets/main.css'),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJSPlugin()
	]).filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
