/**
 * 每日执行脚本
 * 1、获取用户的点餐信息，如果没有，则从同事的列表中随机选择一个
 * 2、点餐（因为点餐过快会导致点餐失败，所以此处同步调用，时间间隔2s）
 * 3、发送邮件
 */

/**node模块 */
const CronJob = require('cron').CronJob;
const sd = require('silly-datetime')
const request = require('request')

/**发送邮件模块 */
const sendEmail = require('../controller/sendEmail')

/**发送微信模块 */
const workWx = require('../controller/workWx')

/**获取当前所有的用户信息 */
const dataBase = require('../controller/dataBase')

/**配置文件 */
const Config = require('../config')

/**
 * 异步点餐
 * @param {Object} account 
 */
async function checkIn(account) {
  /**获取当前的时间（年月日） */
  let date = sd.format(new Date(), 'YYYY-MM-DD')
  let targetTime = date + ' 17:00'

  /**获取用户的餐品ID */
  let dishId = dataBase.queryUserReverse(account.user)[date] || ''
  dishId = dishId ? dishId : dataBase.queryRegularDish()

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

        let orderResultDesc = ''
        /**订餐成功 */
        if (body.status == 'SUCCESSFUL') {
          orderResultDesc = '订单状态：成功\r\n餐品id：' + dishId + '\r\n' + '餐品名称：' + dataBase.queryDishNameById(dishId)
        } else {
          /**订餐失败 */
          orderResultDesc = '订单状态：失败\r\n失败原因：' + (body.error_description || body.message || '未知异常，请至网页或者app点餐')
        }
        console.log(account.user + '|' + JSON.stringify(params) + '|' + JSON.stringify(body))
        resolve('订餐人：' + account.user + '\r\n' + orderResultDesc)
      }, 3000)
    })
  })
}

async function beginTask() {
  // 获取所有的用户
  const userList = dataBase.queryUserList()

  /**聚合文件发送，将脚本的所有执行结果打包发送 */
  let msgArr = []

  /**遍历执行函数 */
  for (let i = 0; i < userList.length; i++) {
    /**获取用户配置文件 */
    let user = userList[i].user.split('@')[0]
    let setting = dataBase.queryUserSetting(user)
    if (!setting.auto_checkin) continue

    let result = await checkIn(userList[i])
    msgArr.push(result)
    console.log(result)

    /**发送微信 */
    if (!setting.wx_notice) continue
    let reverseTxt = '<a href="http://10.1.19.174:3001/order/reverse">美餐点餐提醒（pc点击预约）</a>'

    workWx.send({
      user: user,
      description: reverseTxt + '\r\n' + result
    })
  }

  /**配置文件 */
  const config = require('../config/')

  /**将邮件打包发送 */
  sendEmail({
    toUser: config.admin.join(','),
    content: msgArr.join('\r\n' + '-----------------' + '\r\n')
  })
}

module.exports = {
  begin: beginTask
}