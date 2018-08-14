var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const Task = require('./script/')

var app = express();
var ejs = require('ejs');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'dist/html'));

// app.engine('html', ejs.__express);
app.set('view engine', 'jade');

// 不使用默认的log中间件
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
/**开发环境 */
app.use(express.static(path.join(__dirname, 'static')));

/**线上环境 */
app.use(express.static(path.join(__dirname, 'dist/static')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: '错误'
  });
});

/**
 * 执行定时脚本
 */
Task.begin()

module.exports = app;
