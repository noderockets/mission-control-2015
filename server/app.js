/* @flow */

var koa = require('koa')
var logger = require('koa-logger')
var cors = require('koa-cors')
var body = require('koa-body')
var router = require('koa-router')

var PORT = 3004

var app = koa()

app.use(logger())
app.use(cors())
app.use(body())
app.use(router(app))

app.listen(PORT)

// require('./routes/rocket_object')(app)
