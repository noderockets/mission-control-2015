var React = require('react')

module.exports = React.createClass({

  displayName: 'GamepadCtrl',

  getInitialState() {
    return {
      available: !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || !!navigator.getGamepads
    }
  },

  componentDidMount() {
    setInterval(() => {
      this.pollGamepad()
    }, 10)
  },

  pollGamepad() {
    this.setState({
      gamepad: navigator.getGamepads()[0] || 'AH WHERE IS IT'
    })
  },

  render():ReactElement {
    var {available, gamepad} = this.state
    var launch = gamepad && gamepad.buttons && gamepad.buttons[7].pressed
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
