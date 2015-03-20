/* @flow */

// TODO:: Take out this any annotation when flow writes more node typedefs
var os:any = require('os')

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var config = require('../webpack.config')

new WebpackDevServer(webpack(config), {
  contentBase: 'client/',
  publicPath: '/build/',
  hot: true
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at http://' + os.hostname() + ':3000')
})
