var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**引入脚本 */
const CronJob = require('cron').CronJob
const sd = require('silly-datetime')
const CheckIn = require('./script/checkin')
const Spider = require('./script/spider')
const Message = require('./script/message')
const workWx = require('./controller/WorkWx')
const Setting = require('./script/setting')

var indexRouter = require('./routes/index');

var app = express();
var ejs = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', ejs.__express);
app.set('view engine', 'jade');

// 不使用默认的log中间件
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

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

/**每周一到周五下午16:00点餐 */
new CronJob('00 00 15 * * 1-5', function () {
  CheckIn.begin()
}, null, true, 'Asia/Shanghai')

/**每周一到周五上午10:00爬取数据 */
new CronJob('00 00 10 * * 1-5', function () {
  let now = +new Date()
  let date = sd.format(now, 'YYYY-MM-DD')

  let spider = new Spider(date)
  spider.queryRegularDishs()
  spider.queryDishList()

  /**脚本执行完成通知 */
  let config = require('./config/')
  let user = config.admin.map((v) => {
    return v.split('@')[0]
  }).join('|')

  workWx.send({
    user: user,
    description: '每日爬虫定时脚本任务执行成功'
  })
}, null, true, 'Asia/Shanghai')

/**每周一上午10:30提醒用户点餐 */
new CronJob('00 30 10 * * 1', function () {
  let params = {
    message: '美餐点餐提醒\r\n在电脑上点击即可预定一周的美食\r\n<a href="http://10.1.19.174:3001/order/reverse">开始点餐</a>'
  }
  Message.send(params)
}, null, true, 'Asia/Shanghai')

/**每周五下午两点提醒用户是否关闭自动点餐 */
new CronJob('00 30 14 * * 5', function () {
  let params = {
    message: '鉴于每周五很多同学会回家吃饭，为避免资源的浪费，如果用户不需要点餐，可通过<a href="http://10.1.19.174:3001/setting">菜单--设置</a>选项取消自动点餐'
  }
  Message.send(params)
}, null, true, 'Asia/Shanghai')

/**每周五下午16:00重置setting类 */
new CronJob('00 00 16 * * 5', function () {
  Setting.reset()
}, null, true, 'Asia/Shanghai')

module.exports = app;
