/**
 * 每日执行脚本
 * 1、获取用户的点餐信息，如果没有，则从同事的列表中随机选择一个
 * 2、点餐（因为点餐过快会导致点餐失败，所以此处同步调用，时间间隔3s）
 * 3、发送邮件
 */

/**node模块 */
const sd = require('silly-datetime')
const request = require('request')

/**发送邮件模块 */
const email = require('../controller/email')

/**发送微信模块 */
const workWx = require('../controller/workWx')

/**获取当前所有的用户信息 */
const dataBase = require('../controller/dataBase')

/**配置文件 */
const Config = require('../config')

function CheckIn() {
  // 补偿用户列表
  this.makUpUsers = []
  // 成功的餐品列表
  this.sucDishList = []
  // 邮件发送的消息列表
  this.emailMsg = []
}

CheckIn.prototype = {
  constructor: CheckIn,
  /**
   * 开始任务
   * 1、定时脚本
   * 2、补偿脚本
   * 3、聚合邮件发送
   */
  async begin() {
    await this.beginTask()
    await this.makeUpTask()
    this.sendEmail()
  },
  /**
   * @param {String} user 用户名（邮箱）
   */
  queryDishId(user) {
    /**获取当前的时间（年月日） */
    let date = sd.format(new Date(), 'YYYY-MM-DD')

    /**获取用户预约的餐品ID */
    let id = dataBase.queryUserReverse(user)[date] || ''
    if (id) return { type: 1, id: id }

    /**获取用户收藏的随机餐品ID */
    id = dataBase.queryRegularFavorite(user)
    if (id) return { type: 2, id: id }

    /**随机获取一个餐品ID */
    id = dataBase.queryRegularDish()
    return { type: 3, id: id }
  },
  timedCheckIn() { },
  makeUpCheckIn() { },
  /**
   * 
   * @param {Object} account 用户名（用户cookie信息、remember、uniqueId）
   * @param {String} dishId 餐品ID
   */
  async checkIn(account, dishId) {
    /**获取当前的时间（年月日） */
    let date = sd.format(new Date(), 'YYYY-MM-DD')
    let targetTime = date + ' 17:00'

    let params = {
      corpAddressRemark: '',
      corpAddressUniqueId: Config.spider.corpAddressUniqueId,
      order: JSON.stringify([{
        count: 1,
        dishId: dishId
      }]),
      remarks: '',
      tabUniqueId: account.uniqueId,
      targetTime: targetTime,
      userAddressUniqueId: Config.spider.corpAddressUniqueId
    }

    return await new Promise((resolve, reject) => {
      request.post(Config.host.checkin, {
        headers: {
          Cookie: 'remember=' + account.remember + ';'
        },
        form: params
      }, function (err, response, body) {
        setTimeout(() => {
          /**此处使用try catch，避免美餐服务器异常返回html，无法解析为json */
          try {
            body = JSON.parse(body)
          } catch (e) {
            /**记录异常文件 */
            console.log(account.user + '\r\n' + body)

            /**重定义异常文件 */
            body = {
              error_description: '美餐服务异常或登录态丢失，请至网页或者app点餐'
            }
          }
          // 获取餐品名称
          let status = '', desc = ''
          switch (body.status) {
            case 'SUCCESSFUL':
              status = 'suc'
              break
            case 'MENU_EXPIRED':
              status = 'expired'
              desc = body.message
              break
            default:
              status = 'fail'
              desc = body.error_description || body.message || '未知异常，请至网页或者app点餐'
              break
          }
          let res = {
            user: account.user,
            status: status,
            id: dishId,
            name: dataBase.queryDishNameById(dishId),
            desc: desc
          }
          resolve(res)
        }, 3000)
      })
    })
  },
  /**
   * 开始任务
   */
  async beginTask() {
    // 获取所有的用户
    const userList = dataBase.queryUserList()

    /**遍历执行函数 */
    for (let i = 0; i < userList.length; i++) {
      /**获取用户配置文件 */
      let user = userList[i].user

      /**用户关闭自动点餐 */
      let setting = dataBase.queryUserSetting(user)
      if (!setting.auto_checkin) continue

      /**获取餐品id */
      let dish = this.queryDishId(user)
      let result = await this.checkIn(userList[i], dish.id)
      //console.log(result)

      /**如果用户餐品过期，则将收藏的id设置为已过期，并加入补偿列表中 */
      let msg = ''
      let type = dish.type
      switch (result.status) {
        case 'suc':
          this.sucDishList.push(result.id)
          msg = `订餐人：${result.user}\r\n订单状态：成功\r\n来源：${type === 1 ? '预约' : (type === 2 ? '收藏' : '随机')}\r\n餐品id：${result.id}\r\n餐品名称：${result.name}`
          break
        case 'expired':
          this.makUpUsers.push(userList[i])
          msg = `订餐人：${result.user}\r\n订单状态：失败\r\n失败原因：${result.desc}，脚本将在批跑完成之后补偿`
          break
        default:
          msg = `订餐人：${result.user}\r\n订单状态：失败\r\n失败原因：${result.desc}`
          break
      }
      this.emailMsg.push(msg)

      /**发送微信 */
      if (!setting.wx_notice) continue

      workWx.send({
        user: user.split('@')[0],
        description: msg
      })
    }
  },
  /**
   * 获取成功餐品随机id
   */
  queryRandomSucDishId() {
    let list = this.sucDishList
    /**随机浮动 */
    let index = parseInt(Math.random() * list.length)
    return list[index] || ''
  },
  /**
   * 补偿脚本
   */
  async makeUpTask() {
    let userList = this.makUpUsers
    /**遍历执行函数 */
    for (let i = 0; i < userList.length; i++) {
      /**获取用户配置文件 */
      let user = userList[i].user

      /**获取成功餐品列表的随机id */
      let id = this.queryRandomSucDishId()
      console.log(id)
      let result = await this.checkIn(userList[i], id)
      console.log(result)

      /**如果用户餐品过期，则将收藏的id设置为已过期，并加入补偿列表中 */
      let msg = ''
      switch (result.status) {
        case 'suc':
          msg = `订餐人：${result.user}\r\n订单状态：成功\r\n来源：补偿\r\n餐品id：${result.id}\r\n餐品名称：${result.name}`
          break
        default:
          msg = `订餐人：${result.user}\r\n订单状态：失败\r\n失败原因：${result.desc}`
          break
      }
      this.emailMsg.push(msg)

      /**发送微信 */
      let setting = dataBase.queryUserSetting(user)
      if (!setting.wx_notice) continue

      workWx.send({
        user: user.split('@')[0],
        description: msg
      })
    }
  },
  /**
   * 将邮件内容他打包发送到管理员
   */
  sendEmail() {
    const config = require('../config/')
    email.send({
      toUser: config.admin.join(','),
      content: this.emailMsg.join('\r\n' + '-----------------' + '\r\n')
    })
  }
}

module.exports = new CheckIn()