/**node组件库 */
const request = require('request')

/**配置文件 */
const Host = require('../config/').host
const utils = require('./utils')

/**登录模块 */
const Login = require('../controller/login')

/**数据库模块 */
const dataBase = require('../controller/dataBase')

/**
 * 授信模块
 */
const Auth = {
  /**
   * 登录模块
   * @param {*} req 
   * @param {*} res 
   */
  login(req, res) {
    // 获取参数
    let query = req.query

    /**登录 */
    Login(query, (data) => {
      if (+data.result != 0) {
        res.send(data)
      } else {
        let result_rows = data.result_rows

        // 将cookie发送至客户端
        let to = (new Date(result_rows.expires)).valueOf()
        let from = (new Date()).valueOf()
        let expires = to - from

        let cookie = decodeURIComponent(result_rows.value.join()).split(';')

        let remember = ''

        cookie.forEach((val) => {
          let item = val.split('=')
          let k = item[0],
            v = item[1]
          if (k == 'remember') query['remember'] = v
          res.cookie(item[0], item[1], {
            maxAge: expires
          })
        })

        query.uniqueId = result_rows.uniqueId
        query.expires = expires

        /** 判断如果用户不存在保存数据 */
        let user = dataBase.queryUserInfoByUser(query.user)
        if (user.length == 0) {
          dataBase.updateUser(query)
        }

        // 返回数据
        res.send(data)
      }
    })
  },
  async isLogin(req, res) {
    let login = await Auth.queryIsLogin(req)
    res.json(utils.convert({ login: login }))
  },
  /**
   * 判断用户是否登录
   * @param {Object} req 
   * @param {Object} res 
   */
  async queryIsLogin(req) {
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
  },

  /**
   * 查询用户的基本信息
   * @param {Object} req 
   * @param {Object} res 
   */
  async queryUserInfo(req) {
    return await new Promise((resolve, reject) => {
      request.get(Host.user_info, {
        headers: {
          Cookie: req.headers.cookie
        }
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          body = JSON.parse(body)
          /**获取用户用户名 */

          let user = body.nameForShow.split('@')[0]

          resolve(user)
        }
      })
    })
  }
}

module.exports = Auth