/**node组件库 */
const sd = require('silly-datetime')
const request = require('request')

/**数据库模块 */
const dataBase = require('../controller/dataBase')

/**登录模块 */
const Login = require('../controller/login')
const errorCode = require('../config/error')

/**配置文件 */
const Host = require('../config/').host

/**工具类 */
const utils = {
  /**
   * 统一数据输出格式
   * @param {Object} data 
   */
  convert(data) {
    return {
      result: 0,
      result_info: 'ok',
      result_rows: data || {}
    }
  },
}

const API = {
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

  /**
   * 根据餐厅id查询食品列表
   * @param {String} id 
   */
  queryFoodListById(req, res) {
    let id = req.query.id
    let dishList = dataBase.queryAlldishs()

    let dishInfo = dishList.filter((v) => {
      return v.uniqueId == id
    }) || []

    let foods = dishInfo.length > 0 ? dishInfo[0] : {}

    res.json(utils.convert(foods.list ? foods.list : []))
  },

  /**
   * 提交预约
   */
  submitOrderReverse(req, res) {
    let query = req.query

    /**以用户名称（邮箱）纬度保存 */
    request.get(Host.user_info, {
      headers: {
        Cookie: req.headers.cookie
      }
    }, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        body = JSON.parse(body)

        /**保存数据到数据库中 */
        dataBase.saveOrderReverse({
          user: body.nameForShow,
          data: query
        })
        res.json(utils.convert())
      }
    })
  },

  /**
   * 提交用户设置数据
   * @param {Context} req 
   * @param {Context} res 
   */
  submitSetting(req, res) {

  }
}

module.exports = API