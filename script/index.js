/**引入脚本 */
const CronJob = require('cron').CronJob
const sd = require('silly-datetime')
const CheckIn = require('./checkin')
const Spider = require('./spider')
const Message = require('./message')
const workWx = require('../controller/WorkWx')
const Setting = require('./setting')
const Calendar = require('./calendar')

const Task = {
  begin() {
    /**
     * 如果是节假日，返回
     * 补休，则点餐
     * 周一到周五
     */
    new CronJob('00 00 15 * * *', function () {
      let holiday = dataBase.queryHoliday()
      let date = sd.format(new Date(), 'YYYY-M-DD')
      let today = holiday.filter(v => {
        return v.date === date
      })
      if (today.length > 0) {
        let item = today[0]
        let status = parseInt(item.status)
        switch (status) {
          case 1:
            let params = {
              message: `今天是${item.name}，脚本将不执行自动点餐，如有需要，请至美餐app中手动点取，大家假期愉快\r\n${item.desc}\r\n${item.rest}`
            }
            Message.send(params)
            break
          case 2:
            CheckIn.begin()
        }
      } else {
        // 周一到周五执行点餐
        let day = new Date().getDay()
        if ([1, 2, 3, 4, 5].indexOf(day) === -1) return
        CheckIn.begin()
      }
    }, null, true, 'Asia/Shanghai')

    /**每周一到周五上午10:00爬取数据 */
    new CronJob('00 00 10 * * 1-5', function () {
      let now = +new Date()
      let date = sd.format(now, 'YYYY-MM-DD')

      let spider = new Spider(date)
      spider.queryRegularDishs()
      spider.queryDishList()

      /**脚本执行完成通知 */
      let config = require('../config/')
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
        message: '在电脑上点击即可预定一周的美食\r\n<a href="http://10.1.19.174:3001/order/reverse">开始点餐</a>'
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

    /**每月1号8点更新本月日历信息 */
    new CronJob('00 00 08 1 * *', function () {
      Calendar.checkCalendar()
    }, null, true, 'Asia/Shanghai')
  }
}

module.exports = Task