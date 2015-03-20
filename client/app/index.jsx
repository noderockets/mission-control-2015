/* @flow */

require('babel/polyfill')

var React = require('react')

var Main = require('./main')

function render() {
  React.render(<Main/>, document.getElementById('three'))
  // React.render(<Thing/>, document.getElementById('gamepad'))
}





var Thing = React.createClass({

  getInitialState() {
    return {}
  },

  componentDidMount() {
    var available = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || !!navigator.getGamepads

    console.log(available)
    this.setState({
      available
    })

    setInterval(() => {
      this.pollGamepad()
    }, 10)
  },

  pollGamepad() {
    console.log('polling')
    this.setState({
      gamepad: navigator.getGamepads()[0] || 'AH WHERE IS IT'
    })
  },

  render():ReactElement {
    var {available, gamepad} = this.state
    var launch = gamepad && gamepad.buttons[7].pressed
    return (
      <div>
        <div>{available ? 'Supported!!' : 'Not supported :('}</div>
        <div>{launch && <h1>LAUNCH</h1>}</div>
        <pre>
          {JSON.stringify(gamepad, null, 2)}
        </pre>
      </div>
    )
  }

})

render()
