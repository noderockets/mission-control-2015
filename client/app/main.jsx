/* @flow */

var React = require('react')
var THREE = require('three')

var ExampleStage = require('./stage')

module.exports = React.createClass({

  displayName: 'Main',

  pollGamepad() {
    var {sceneprops} = this.state
    var {cubeData} = sceneprops

    var pad = navigator.getGamepads()[0]
    if (!pad) {
      return
    }

    cubeData.quaternion.setFromEuler(new THREE.Euler(pad.axes[3], pad.axes[2], 0))
    this.setState({sceneprops})
    requestAnimationFrame(this.pollGamepad)
  },

  getInitialState() {
    return {
      sceneprops: {
        width: window.innerWidth,
        height: window.innerHeight,
        cubeData: {
          position: new THREE.Vector3(0, 0, 0),
          quaternion: new THREE.Quaternion()
        }
      }
    }
  },

  componentDidMount() {
    this.pollGamepad()
  },

  render():ReactElement {
    var {sceneprops} = this.state
    return <ExampleStage {...sceneprops}/>
  }

})
