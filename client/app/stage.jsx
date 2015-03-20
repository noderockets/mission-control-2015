/* @flow */

var React = require('react')
var {Scene} = require('react-three')

var Camera = require('./camera')
var Cube = require('./cube')

module.exports = React.createClass({

  displayName: 'ExampleScene',

  render() {
    var {cubeData, width, height} = this.props
    var pos = {width, height}

    return (
      <Scene camera="maincamera" {...pos}>
        <Camera {...pos}/>
        <Cube {...cubeData}/>
      </Scene>
    )
  }
})
