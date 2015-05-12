/* @flow */
/* globals Promise:true */

var PORT = 3004
var COUCH = 'http://localhost:5984'

var LAUNCHER_API = 'http://localhost:8080'

var http:any = require('http')
var express = require('express')
var cors = require('cors')
var socketio = require('socket.io')
var socket = require('socket.io-client')(LAUNCHER_API)
var Promise = require('bluebird')
var request = require('request')
var {pluck, omit} = require('lodash')

Promise.promisifyAll(request)

var app = express()
app.use(cors())
var server = http.Server(app)
var io = socketio(server)

server.listen(PORT)
console.log('API Server listening on ' + PORT)

function sortFn(a, b) {
  return a.dt - b.dt
}

function getSessions(req, res) {
  var url = `${COUCH}/rocket_data/_design/_view/_view/session?group=true`
  request.getAsync(url).spread(function (resp, body) {
    var json = JSON.parse(body)
    res.send(pluck(json.rows, 'key'))
  })
}

function getSession(id) {
  return new Promise(function (resolve) {
    var url = `${COUCH}/rocket_data/_design/_view/_view/session?key="${id}"&reduce=false&include_docs=true`
    request.getAsync(url).spread(function (resp, body) {
      var json = JSON.parse(body)
      var rows = pluck(json.rows, 'doc')
      rows.sort(sortFn)
      resolve(rows)
    })
  })
}

function sendValue(socket, values) {
  var val = values.shift()
  socket.emit('value', omit(val, ['_id', '_rev', 'session']))
  if (values.length) {
    var dTime = values[0].dt - val.dt
    setTimeout(function () {
      sendValue(socket, values)
    }, dTime)
  }
}

app.get('/fill/open', function(req, res) {
  request(`${LAUNCHER_API}/fill/open`)
  res.send('ok')
})

app.get('/fill/close', function(req, res) {
  request(`${LAUNCHER_API}/fill/close`)
  res.send('ok')
})

app.get('/launch/open', function(req, res) {
  request(`${LAUNCHER_API}/launch/open`)
  res.send('ok')
})

app.get('/launch/close', function(req, res) {
  request(`${LAUNCHER_API}/launch/close`)
  res.send('ok')
})

app.get('/sessions', getSessions)

io.on('connection', function (socket) {
  socket.on('session', function (id) {
    getSession(id).then(function (sessionData) {
      sendValue(socket, sessionData)
    })
  })
})

socket.on('data', function (data) {
  io.sockets.emit('data', data)
})
