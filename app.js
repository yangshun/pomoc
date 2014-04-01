
/**
 * Module dependencies.
 */

var una = require('una');

var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = una.app;
var express = una.express;
var io = una.io;

var bootstrap = require('bootstrap3-stylus');
var stylus = require('stylus');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/dashboard', routes.dashboard);
app.get('/mobile', routes.mobile);

// var server = http.createServer(app);
// server.listen(app.get('port'), function(){
//   console.log('Una server listening on port ' + app.get('port'));
// });

una.listen(process.env.PORT || 3000);
