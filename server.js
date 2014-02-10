var express         = require('express');
var nodejsx         = require('node-jsx').install();
var browserify      = require('connect-browserify');
var ReactMiddleware  = require('react-async-middleware');
var App             = require('./client');

var debug = process.env.NODE_ENV !== 'production';

var api = express()
  .get('/users/:username', function(req, res) {
    res.send({username: req.params.username});
  });

express()
  .get('/bundle.js', browserify('./client', {debug: debug, watch: debug}))
  .use('/api', api)
  .use(ReactMiddleware(App))
  .listen(3000);
