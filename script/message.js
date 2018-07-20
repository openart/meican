/**
 * 每周一执行脚本
 * 提醒用户点餐
 */

/**数据库模块 */
const dataBase = require('../controller/dataBase')

/**微信模块 */
const workWx = require('../controller/WorkWx')

function Message() {

}

Message.prototype = {
  constructor: Message,
  send(options) {
    options = options || {}
    
    // 获取所有的用户
    const userList = dataBase.queryUserList()

    let toUser = userList.map((v) => {
      return v.user.split('@')[0]
    }).join('|')

    workWx.send({
      user: toUser,
      description: options.message || '至美一餐\r\n在电脑上点击即可预定一周的美食\r\n<a href="http://10.1.19.174:3001/order/reverse">开始点餐</a>'
    })
  }
}

module.exports = new Message()