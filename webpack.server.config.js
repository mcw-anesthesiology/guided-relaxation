const config = require('sapper/webpack/config.js');

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.html'],
		mainFields: ['svelte', 'module', 'main']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						forceEnv: 'server'
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							forceEnv: 'server'
						}
					},
					{
						loader: 'svelte-loader',
						options: {
							css: false,
							cascade: false,
							store: true,
							generate: 'ssr'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: 'ignore-loader'
			},
			{
				test: /\.js$/,
				include: [
					/bootstrap/
				],
				use: 'ignore-loader'
			}
		]
	},
	externals: {
		knex: 'commonjs knex'
	}
};
