var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var GridFsStream = require('gridfs-stream');
var GridFs = require('grid-fs');
var routes = require('./routes/index');
var filesystemRoutes = require('./routes/filesystem');

// @param {Object} app - express app instance
module.exports.init = function(app) {
  var Schema;
  var conn;

  Grid.mongo = mongoose.mongo;
  conn = mongoose.createConnection('mongodb://localhost/ayria_db');
  conn.once('open', function () {
    var gfss = GridFsStream(conn.db);
    app.set('gridfsstream', gfss);
    var gridFs = new GridFs(db);
    app.set('gridfs', gridFs);
  });

  app.set('mongoose', mongoose);
  Schema = mongoose.Schema;
  // setup the schema for DB
  //require('../db/schema')(Schema, app);
};

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', filesystemRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
