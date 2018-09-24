// 引入组件
const sd = require('silly-datetime')
const fs = require('fs')
const request = require('request')
const iconv = require('iconv-lite');
const Config = require('../config')
const querystring = require("querystring")
const Path = require('../config/').path

/**
 * 调取百度的接口查询日历信息
 * @param {String} date 时间
 */
function Calendar() {
  this.year = ''
  this.month = ''
}

Calendar.prototype = {
  constructor: Calendar,
  /**
   * 查询日历信息，每月1号执行
   */
  async checkCalendar(date) {
    date = date ? date : sd.format(new Date(), 'YYYY-MM')
    let arr = date.split('-')
    let year = arr[0]
    let month = arr[1]

    /**组织参数 */
    let params = {
      query: year + '年' + month + '月',
      resource_id: 6018,
      format: 'json'
    }
    let url = Config.host.calendar + '?' + querystring.stringify(params)
    return await new Promise((resolve, reject) => {
      request.get(url, {
        encoding: null
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          let buf = iconv.decode(body, 'gbk').toString()
          let data = JSON.parse(buf).data[0]
          /**判断文件夹是否存在，如不存在，则创建 */
          if (!fs.existsSync(Path.calendar)) {
            fs.mkdirSync(Path.calendar)
          }
          let path = Path.calendar + year + '-' + month
          fs.writeFileSync(path, JSON.stringify(data))
          console.log(`${date}日历信息更新成功`)
        } else {
          reject()
        }
      })
    })
  }
}

module.exports = new Calendar()