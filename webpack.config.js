var webpack = require('webpack')
var os = require('os')
var autoprefixer = require('autoprefixer-core')

module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
    new webpack.HotModuleReplacementPlugin()
  ],

  entry: [
    'webpack-dev-server/client?http://' + os.hostname() + ':3000',
    'webpack/hot/dev-server',
    './client/app/index.jsx'
  ],

  output: {
    path: __dirname + '/client/build/',
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.styl']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'react-hot!babel', exclude: [/node_modules/] },
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/] },
      { test: /\.styl$/, loader: 'style!css!postcss!stylus' }
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],

  externals: {
    APIHOST: '"localhost:3004"'
  },

  devtool: '#eval'
}
