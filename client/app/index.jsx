/* @flow */

require('babel/polyfill')
require('whatwg-fetch')
require('./socket')

var React = require('react')

var Historical = require('./historical')
var Dashboard = require('./dashboard/index')

require('./flight-graph/index')

// var THREE = require('three')
// window.THREE = THREE
// var noop = function () {}
// require('./lib/AssimpJSONLoader')

React.createClasss = React.createClass

var Main = require('./3d-display/main')
var Thing = require('./gamepad-ctrl')

function render() {
  // three.js stuff
  React.render(<Main/>, document.getElementById('three'))
  // React.render(<Historical/>, document.getElementById('historical'))
  React.render(<Dashboard/>, document.getElementById('dashboard'))
  // React.render(<App/>, document.getElementById('foo'))
  // React.render(<Thing/>, document.getElementById('gamepad'))
}

// var loader = new THREE.AssimpJSONLoader()
// loader.load('models/Jupiterc_carbajal.json', function (geometry) {
//   render(geometry)
// }, noop, noop, 'models/textures')

render()
