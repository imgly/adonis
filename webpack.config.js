var path = require('path')
var webpack = require('webpack')
var MINIFY = process.env.MINIFY
var BASENAME = process.env.NO_INJECTION ? 'adonis-no-injection' : 'adonis'

module.exports = {

  debug: false,
  watch: !!process.env.WATCH,

  entry: {
    index: process.env.NO_INJECTION ? './src/no-injection.js' : './src/index.js'
  },

  output: {
    path: './build',
    filename: BASENAME + (MINIFY ? '.min.js' : '.js'),
    library: 'adonis',
    libraryTarget: 'umd'
  },

  externals: {
    react: 'React'
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/lib'
    ]
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, './src')
      ],
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  plugins: MINIFY ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
}
