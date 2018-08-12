"use strict";
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const CONFIG = require('./config');
const rountIndex = require('./routes/index');

const app = express();

// webpack
if (1) {
  var webpackConfig = require('./build/webpack.dev.conf');
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var compiler = webpack(webpackConfig);
  var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: true,
      progress: true
    }
  });
  var hotMiddleware = require('webpack-hot-middleware')(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/', rountIndex);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// ============== log4js init ==============
if (CONFIG.log.isOpenningNode) {
  var log4js = require('log4js');
  log4js.loadAppender('file');
  log4js.configure({
    appenders: [
      { type: 'console' },
      { type: 'file', filename: './log/cheese.log', category: 'cheese' }
    ]
  });
}
// ============== log4js init ==============


// ============== HTTP log ==============
if (CONFIG.log.isOpenningHTTP) {
  var logDirectory = path.join(__dirname, 'log');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  });
  app.use(morgan('combined', { stream: accessLogStream }));
}
// ============== HTTP log ==============

module.exports = app;
