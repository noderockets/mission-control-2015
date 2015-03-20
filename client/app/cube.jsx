/* @flow */

var React = require('react')
var THREE = require('three')
var {Mesh, Object3D} = require('react-three')

var centered = new THREE.Vector3(0, 0, 0)
var boxGeometry = new THREE.BoxGeometry(200, 200, 200)
var material = new THREE.MeshNormalMaterial()

module.exports = React.createClass({

  displayName: 'Cube',

  render() {
    var {quaternion, position} = this.props
    return (
      <Object3D quaternion={quaternion} position={position}>
        <Mesh position={centered} geometry={boxGeometry} material={material} />
      </Object3D>
    )
  }

})
