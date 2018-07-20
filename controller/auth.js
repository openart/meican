/**node组件库 */
const request = require('request')

/**配置文件 */
const Host = require('../config/').host

/**
 * 授信模块
 */
const Auth = {
  /**
   * 判断用户是否登录
   * @param {Object} req 
   * @param {Object} res 
   */
  async login(req) {
    return await new Promise((resolve, reject) => {
      request.get(Host.basic, {
        headers: {
          Cookie: req.headers.cookie
        }
      }, function (err, response, body) {
        if (!err) {
          let login = 0
          try {
            JSON.parse(body)
            login = 1
          } catch (e) {
            login = 0
          }
          resolve(login)
        }
      })
    })
  }
}

module.exports = Auth