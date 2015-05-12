var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server, {log: false})

server.listen(8080)
console.log('Server listening on 8080')

var fillID

app.get('/fill/open', function(req, res) {
  res.send('ok')
  if (!fillID) {
    fillID = fillUp()
  }
})

app.get('/fill/close', function(req, res) {
  res.send('ok')
  clearInterval(fillID)
  fillID = null
})

app.get('/launch/open', function(req, res) {
    res.send('ok')
})

app.get('/launch/close', function(req, res) {
  res.send('ok')
})

app.get('/data', function(req, res) {
  res.json({pressure: 500})
})

function fillUp() {
  var fill = 0
  return setInterval(function () {
    fill += 1
    io.sockets.emit('data', {pressure: fill})
  }, 500)
}

var setupSocketListeners = function (socket) {
  socket.emit('ready', 0)

  socket.on('openFill', function () {
    socket.emit('fillValve', {state: 'open'})
    if (!fillID) {
      fillID = fillUp(socket)
    }
  })

  socket.on('closeFill', function () {
    socket.emit('fillValve', {state: 'closed'})
    clearInterval(fillID)
    fillID = null
  })

  socket.on('openLaunch', function () {
    socket.emit('launchValve', {state: 'open'})
  })

  socket.on('closeLaunch', function () {
    socket.emit('launchValve', {state: 'closed'})
  })

  socket.on('reset', function () {
    socket.emit('fillValve', {state: 'closed'})
    socket.emit('launchValve', {state: 'closed'})
    clearInterval(fillID)
    fillID = null
  })
}

// Connect up the socket on connection
io.sockets.on('connection', function (socket) {
  socket.emit('hello')
  setupSocketListeners(socket)
})
