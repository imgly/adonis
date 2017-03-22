var path = require('path')
var qs = require('querystring')
var webpack = require('webpack')

const MINIFY = process.env.MINIFY
const plugins = []

if (MINIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

module.exports = {
  debug: false,
  watch: !!process.env.WATCH,

  entry: {
    index: './src/index'
  },

  output: {
    path: './build',
    filename: 'adonis' + (MINIFY ? '.min.js' : '.js'),
    library: 'adonis',
    libraryTarget: 'umd'
  },

  externals: {
    react: 'react'
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
    }, {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, './src')
      ],
      exclude: /node_modules/,
      loader: 'preprocess?' + qs.stringify({})
    }]
  },

  plugins: plugins
}
