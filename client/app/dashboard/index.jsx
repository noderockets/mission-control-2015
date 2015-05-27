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
      <div>
        <div>
          <Filler width={'100%'} height={40} fillLevel={this.state.level}/>
        </div>
        <div style={{textAlign: 'center'}}>
          <button style={{backgroundColor: 'rgb(94,182,45)', marginRight: '8px'}} onClick={this.openFill}>Open Fill Valve</button>
          <button style={{backgroundColor: 'rgb(94,182,45)', marginRight: '8px'}} onClick={this.openLaunch}>Open Launch Valve</button>
          <button style={{backgroundColor: 'rgb(94,182,45)', marginRight: '8px'}} onClick={this.closeFill}>Close Fill Valve</button>
          <button style={{backgroundColor: 'rgb(94,182,45)', marginRight: '8px'}} onClick={this.closeLaunch}>Close Launch Valve</button>
          <button style={{backgroundColor: 'rgb(94,182,45)', marginRight: '8px'}} disabled>Deploy Parachute</button>
        </div>
      </div>
    )
  }

})

var Filler = React.createClass({

  displayName: 'Filler',

  render(): ReactElement {
    var {fillLevel, width, height} = this.props

    var _width = fillLevel + '%'
    var r = Math.floor(fillLevel / 100 * 255)
    var g = Math.floor((100 - fillLevel) / 100 * 255)
    var backgroundColor = `rgb(${r}, ${g}, 0)`

    return (
      <div style={{width, height}}>
        <div style={{position: 'relative', border: '2px solid #ccc', height: '100%', width: '100%'}}>
          <div style={{position: 'absolute', bottom: 0, backgroundColor, width: _width, height: '100%'}}><span style={{marginLeft: '10px'}}>{_width}</span></div>
        </div>
      </div>
    )
  }

})
