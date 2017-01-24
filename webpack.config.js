var path = require('path')
var webpack = require('webpack')
var MINIFY = process.env.MINIFY

module.exports = {

  debug: false,
  watch: !!process.env.WATCH,

  entry: {
    index: './src/index.js'
  },

  output: {
    path: './build',
    filename: MINIFY ? 'adonis.min.js' : 'adonis.js',
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
