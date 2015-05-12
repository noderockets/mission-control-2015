/* @flow */

var c3 = require('c3')

var socket = require('../socket')

var points = [['x', 'ax', 'ay', 'az', 'gx', 'gy', 'gz']]

var chart = c3.generate({
  bindto: '#graph',
  data: {
    x: 'x',
    rows: points,
    type: 'spline'
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%S'
      }
    }
  },
  transition: {
    duration: null
  },
  subchart: {
    show: true
  }
})

socket.on('value', data => {
  points.push([data.dt, data.ax, data.ay, data.az, data.gx, data.gy, data.gz])
  chart.load({
    rows: points
  })
})



c3.generate({
  bindto: '#gauge',
  data: {
    columns: [
      ['data', 73]
    ],
    type: 'gauge'
  },
  color: {
    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
    threshold: {
      values: [30, 60, 90, 100]
    }
  },
  size: {
    height: 180
  }
})
