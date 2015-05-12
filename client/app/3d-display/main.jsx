/* @flow */

var React = require('react')
var THREE = require('three')

var ExampleStage = require('./stage')
var socket = require('../socket')

module.exports = React.createClass({

  displayName: 'Main',

  rotation: 0,
  demoMode() {
    window.requestAnimationFrame(this.demoMode)
    this.rotation += 0.01
    var e = new THREE.Euler(this.rotation, this.rotation * 3, 0)
    this.setEuler(e)
  },

  pollGamepad() {
    window.requestAnimationFrame(this.pollGamepad)
    var pad = navigator.getGamepads()[0]
    if (pad && pad.axes) {
      var e = new THREE.Euler(pad.axes[3], pad.axes[2], 0)
      this.setEuler(e)
    }
  },

  setupSocket() {
    socket.on('value', data => {
      var x = data.gx / 6000
      var y = data.gy / 6000
      var z = data.gz / 6000
      var e = new THREE.Euler(x, y, z)
      this.setEuler(e)
    })
  },

  setEuler(euler) {
    var {sceneprops} = this.state
    var {cubeData} = sceneprops
    cubeData.quaternion.setFromEuler(euler)
    this.setState({sceneprops})
  },

  getInitialState() {
    return {
      sceneprops: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        cubeData: {
          position: new THREE.Vector3(0, 0, 0),
          quaternion: new THREE.Quaternion()
        }
      }
    }
  },

  componentDidMount() {
    // this.pollGamepad()
    // this.demoMode()
    this.setupSocket()
  },

  render():ReactElement {
    var {sceneprops} = this.state
    return <ExampleStage {...sceneprops}/>
  }

})
