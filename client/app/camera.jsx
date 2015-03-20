/* @flow */

var React = require('react')
var THREE = require('three')
var {PerspectiveCamera} = require('react-three')

module.exports = React.createClass({

  displayName: 'Camera',

  render() {
    var {width, height} = this.props

    var cameraprops = {
      fov: 75,
      aspect: width / height,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, 0, 600),
      lookat: new THREE.Vector3(0, 0, 0)
    }

    return <PerspectiveCamera name="maincamera" {...cameraprops}/>
  }
})
