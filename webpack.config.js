var path = require('path')

module.exports = {

  debug: false,
  watch: !!process.env.WATCH,

  entry: {
    index: './src/index.js'
  },

  target: 'async-node',

  devtool: 'source-map',

  output: {
    path: './build',
    filename: 'adonis.js',
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
  }

}
