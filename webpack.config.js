var path = require('path')
var qs = require('querystring')
var webpack = require('webpack')

const { PRE_INJECTION, NO_INJECTION, NO_OBJECT_STYLES, MINIFY } = process.env

var plugins = [
  new webpack.DefinePlugin({
    'process.env.PRE_INJECTION': JSON.stringify(PRE_INJECTION),
    'process.env.NO_INJECTION': JSON.stringify(NO_INJECTION),
    'process.env.NO_OBJECT_STYLES': JSON.stringify(NO_OBJECT_STYLES)
  })
]
if (MINIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

var OUTPUT_NAME = 'adonis'
if (NO_INJECTION) {
  OUTPUT_NAME = 'adonis-no-injection'
} else if (PRE_INJECTION) {
  OUTPUT_NAME = 'adonis-pre-injection'
} else if (NO_OBJECT_STYLES) {
  OUTPUT_NAME = 'adonis-no-object-styles'
}

module.exports = {

  debug: false,
  watch: !!process.env.WATCH,

  entry: {
    index: './src/index'
  },

  output: {
    path: './build',
    filename: OUTPUT_NAME + (MINIFY ? '.min.js' : '.js'),
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
      loader: 'preprocess?' + qs.stringify({ PRE_INJECTION, NO_INJECTION, NO_OBJECT_STYLES })
    }]
  },

  plugins: plugins
}
