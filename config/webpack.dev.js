var webpack = require('webpack');
ExtractTextPlugin = require("extract-text-webpack-plugin");
	const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths')

module.exports = {
  mode: 'development',
	entry: paths.src + '/index.js',
	output: {
		path: paths.build,
		filename: 'wbs.bundle.js'
	},

	resolve: {
		modules: [
			'./src/lib',
			'node_modules'
		]
	},

	module: {
		noParse: [
			/(node_modules|~)\/(crappy\-bundled\-lib|jquery)\//gi
		],

		// preLoaders: [
		// 	// before hitting the actual loaders, load any sourcemaps specified by npm modules
		// 	{ loader: 'source-map' }
		// ],

		rules: [
			// transpile ES6/7 to ES5 via babel
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(less|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
			}
		]
	},

	plugins: ([
		// new webpack.HotModuleReplacementPlugin(),
		// new HtmlWebpackPlugin({
    //   title: 'Broadcast stream',
    //   // favicon: paths.src + '/images/favicon.png',
		// 	template: './index.html', // template file
		// 	inject: 'head',
		// 	publicPath: '/'
    // }),
	// 	// Avoid publishing files when compilation failed:
	// 	new webpack.NoErrorsPlugin(),

	// 	// Aggressively remove duplicate modules:
	// 	new webpack.optimize.DedupePlugin(),

	// 	// Write out CSS bundle to its own file:
	// 	new ExtractTextPlugin('style.css', { allChunks: true })
	// ]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
	// 	new webpack.optimize.OccurenceOrderPlugin(),

	// 	// minify the JS bundle
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		output: { comments: false },
	// 		exclude: [ /\.min\.js$/gi ]		// skip pre-minified libs
	// 	})
	]),

	// Pretty terminal output
	stats: { colors: true },

	devtool: 'source-map',

	devServer: {
		port: process.env.PORT || 8111,
		static: {
			directory: './'
		},
    historyApiFallback: true,
		hot: true,
		// publicPath: 'http://localhost:8111'
	}
};