/**node 组件模块 */
const superagent = require('superagent')
const request = require('request')
const _ = require('underscore')
const sd = require('silly-datetime')
const cheerio = require('cheerio')

/**应用ip代理工具 */
require('superagent-proxy')(superagent)

/**配置文件 */
const Config = require('../config/')

/**
 * 模拟登录ip
 */
var ip = _.random(1, 254) +
  "." + _.random(1, 254) +
  "." + _.random(1, 254) +
  "." + _.random(1, 254)

/**
 * 模拟登录的headers
 */
let headers = {}
/**
 * 自动签到
 * @param account {object}
 * @constructor
 */
function Login(account, cb) {
  this.account = account
  this.cb = cb
  this.cookieval = null

  this.init()
}

Login.prototype = {
  constructor: Login,

  async init() {
    let loginRes = await this._login()

    if (+loginRes.result != 0) {
      /**如果为验证码错误，则次数获取验证码 */
      if (loginRes.result_info == '验证码错误') {
        let code = await this.queryVeritifyCode()
        loginRes = {
          result: 1005,
          result_info: '验证码错误',
          result_rows: code
        }
      }
    } else {
      /**获取uniqueid */
      let uniqueId = await this.queryUniqueId()
      loginRes.result_rows.uniqueId = uniqueId
    }

    /**执行回调函数 */
    this.cb(loginRes)
  },

  // 登录
  async _login() {
    let that = this

    return await new Promise((resolve, reject) => {
      superagent
        .post(Config.host.login)
        .set(headers)
        .type('form')
        .set('ip', ip)
        .send({
          username: that.account.user,
          password: that.account.pwd,
          code: that.account.code,
          rand: that.account.rand,
          remember: true,
          openId: '',
          loginType: 'username',
          redirectUrl: 'https://meican.com/login'
        })
        .redirects(0) // 防止页面重定向
        .end(function (result) {
          // 此处做特殊处理，利用正则表达式对'&error=[\s\S]*?&'进行非贪婪匹配
          let cookie = result.response.header['set-cookie']

          let rex = new RegExp(/&error=([\s\S]*?)&/i)
          let errInfo = decodeURIComponent(cookie.join()).match(rex)

          let cbData = {}
          // 表示登录错误
          if (errInfo && errInfo.length > 0) {
            cbData = {
              result: 1001,
              result_info: errInfo[1]
            }
          } else {
            that.cookieval = cookie
            cbData = {
              result: 0,
              result_info: 'ok',
              result_rows: {
                value: cookie,
                expires: cookie.join().match(/Expires=([\s\S]*?);/i)[1]
              }
            }
          }
          resolve(cbData)
        })
    })
  },
  /**
   * 获取用户的uniqueid
   */
  async queryUniqueId(cb) {
    let that = this
    /**不可以爬取周日的数据
     * 尽量不去爬周日的数据。
     * 所以爬取离当前时间最近的周一 */

    let date = new Date()
    let weekday = +date.getDay()
    weekday = weekday == 0 ? 7 : weekday
    let ts = date.valueOf() + 24 * 60 * 60 * 1000 * (8 - weekday)
    let d = sd.format(ts, 'YYYY-MM-DD')

    /**组织参数 */
    let params = {
      'beginDate': d,
      'endDate': d,
      'withOrderDetail': false
    }
    return await new Promise((resolve, reject) => {
      request.post(Config.host.uniqueid, {
        headers: {
          Cookie: that.cookieval
        },
        form: params
      }, function (err, response, body) {
        body = JSON.parse(body)
        if (!err && response.statusCode == 200) {
          let dateList = body.dateList[0]
          let calendarList = dateList.calendarItemList

          /**获取晚餐数据 */
          let dinner = calendarList.filter((v) => {
            return v.openingTime.uniqueId === Config.spider.timeUniqueId
          })[0]
          let uniqueId = dinner.userTab.uniqueId
          resolve(uniqueId)
        } else {
          reject()
        }
      })
    })
  },
  /**
   * 如果美餐服务段返回“验证码错误”，则脚本爬取验证码图片，返回给客户端
   */
  async queryVeritifyCode() {
    return await new Promise((resolve, reject) => {
      request.get(Config.host.veritifyCode, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          let $ = cheerio.load(body)
          let veritifyCode = $('#captcha_img').attr('src')
          let rand = $('#rand').val()
          resolve({
            code: veritifyCode,
            rand: rand
          })
        } else {
          reject()
        }
      })
    })
  }
}

module.exports = function (account, cb) {
  return new Login(account, cb);
};