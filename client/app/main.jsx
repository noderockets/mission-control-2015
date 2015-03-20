/* @flow */

var React = require('react')
var THREE = require('three')

var ExampleStage = require('./stage')

module.exports = React.createClass({

  displayName: 'Main',

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
    var {sceneprops} = this.state
    var {cubeData} = sceneprops
    var rotationangle = 0

    var spinCube = t => {
      rotationangle = t * 0.001
      cubeData.quaternion.setFromEuler(new THREE.Euler(rotationangle, rotationangle * 3, 0))

      this.setState({sceneprops})

      requestAnimationFrame(spinCube)
    }

    spinCube(0)
  },

  render():ReactElement {
    var {sceneprops} = this.state
    return <ExampleStage {...sceneprops}/>
  }

})
