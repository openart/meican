/**
 * 消息发送类
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
      description: options.message || ''
    })
  }
}

module.exports = new Message()