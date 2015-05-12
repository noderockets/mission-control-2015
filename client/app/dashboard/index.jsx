/* @flow */

var React = require('react')
var axios = require('axios')
var APIHOST = require('APIHOST')

var io = require('../socket')

module.exports = React.createClass({

  displayName: 'Dashboard',

  getInitialState() {
    return {
      level: 0
    }
  },

  componentDidMount() {
    io.on('data', resp => {
      var level = resp.pressure > 100 ? 100 : resp.pressure
      this.setState({level})
    })
  },

  openFill() {
    axios.get(`${APIHOST}/fill/open`)
  },

  closeFill() {
    axios.get(`${APIHOST}/fill/close`)
  },

  openLaunch() {
    axios.get(`${APIHOST}/launch/open`)
  },

  closeLaunch() {
    axios.get(`${APIHOST}/launch/close`)
  },

  render(): ReactElement {
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <button onClick={this.openFill}>Open Fill Valve</button>
          <button onClick={this.openLaunch}>Open Launch Valve</button>
          <button onClick={this.closeFill}>Close Fill Valve</button>
          <button onClick={this.closeLaunch}>Close Launch Valve</button>
          <button disabled>Deploy Parachute</button>
        </div>
        <div style={{flex: 5}}>
          <Filler width={40} height={500} fillLevel={this.state.level}/>
          <div>{this.state.level}%</div>
        </div>
      </div>
    )
  }

})

var Filler = React.createClass({

  displayName: 'Filler',

  render(): ReactElement {
    var {fillLevel, width, height} = this.props

    var _height = fillLevel + '%'
    var r = Math.floor(fillLevel / 100 * 255)
    var g = Math.floor((100 - fillLevel) / 100 * 255)
    var backgroundColor = `rgb(${r}, ${g}, 0)`

    return (
      <div style={{width, height}}>
        <div style={{position: 'relative', border: '2px solid #ccc', height: '100%', width: '100%'}}>
          <div style={{position: 'absolute', bottom: 0, backgroundColor, height: _height, width: '100%'}}></div>
        </div>
      </div>
    )
  }

})
