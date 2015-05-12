/* @flow */
/* globals fetch */

var React = require('react')
var APIHOST = require('APIHOST')

var socket = require('./socket')

/*::
type State = {
  sessions: Array<any>;
}
*/

module.exports = React.createClass({

  displayName: 'Historical',

  getInitialState():State {
    return {
      sessions: []
    }
  },

  componentDidMount():void {
    this.getSessions()
  },

  getSessions():void {
    fetch(`${APIHOST}/sessions`)
      .then(res => res.json())
      .then(sessions => this.setState({sessions}))
  },

  startSession(session:string) {
    socket.emit('session', session)
  },

  renderSession(session:string):ReactElement {
    return (
      <div>
        <button onClick={() => this.startSession(session)}>{session.slice(0, 8)}</button>
      </div>
    )
  },

  render():ReactElement {
    var {sessions} = this.state
    return (
      <div>
        <h2>Replay Saved Session:</h2>
        {sessions.map(this.renderSession)}
      </div>
    )
  }

})
