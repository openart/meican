/**node组件库 */
const request = require('request')
const sd = require('silly-datetime')

/**数据库模块 */
const dataBase = require('../controller/dataBase')

/**异常信息处理模块 */
const errorCode = require('../config/error')

/**配置文件 */
const Host = require('../config/').host
const Auth = require('./auth')

/**
 * 页面视图引擎
 */
const Home = {
  /**
   * 首页
   * @param {context} req 
   * @param {context} res 
   */
  index(req, res) {
    res.render('index', {
      title: '首页'
    })
  },
  /**
   * 关于
   * @param {context} req 
   * @param {context} res 
   */
  about(req, res) {
    res.render('about', {
      title: '关于'
    })
  },
  /**
  * 登入
  * @param {context} req 
  * @param {context} res 
 */
  login(req, res) {
    res.render('login', {
      title: '登录'
    })
  },
  /**
   * 查询用户列表
   * @param {context} req 
   * @param {context} res 
   */
  userList(req, res) {
    let userList = dataBase.queryUserList()
    res.render('user_list', {
      title: '用户列表',
      list: userList
    })
  },

  /**
   * 实时查询用户基础信息
   */
  async userInfo(req, res) {
    let login = await Auth.login(req)
    if (!login) {
      res.render('login', {
        title: '登入'
      })
    }
    request.get(Host.user_info, {
      headers: {
        Cookie: req.headers.cookie
      }
    }, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        body = JSON.parse(body)
        res.render('user_info', {
          title: '基本信息',
          data: body
        })
      }
    })
  },
  /**订单预约 */
  async orderReverse(req, res) {
    let login = await Auth.login(req)
    if (!login) {
      res.render('login', {
        title: '登入'
      })
    }
    /**获取餐厅列表 */
    let dishList = dataBase.queryAlldishs()

    // 获取当前时间
    let dates = []

    /**
     * 获取周天数
     * 截止周五
     */
    let date = new Date()
    let weekday = +date.getDay()
    var weekdayZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    let days = 5 - weekday
    for (var i = 0; i <= days; i++) {
      let d = date.valueOf() + 24 * 60 * 60 * 1000 * i
      let next = sd.format(d, 'YYYY-MM-DD')

      dates.push({
        k: next,
        v: next + '（' + weekdayZh[weekday++] + '）'
      })
    }

    /**判断是pc或者是h5 */
    var deviceAgent = req.headers['user-agent'].toLowerCase()
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/)
    let template = agentID ? 'order_reverse' : 'order_reverse_web'

    /**渲染模版 */
    res.render(template, {
      title: '订单预约',
      dates: dates,
      dishs: dishList
    })
  },

  /**
   * 用户预约查询
   */
  async userReverse(req, res) {
    let login = await Auth.login(req)
    if (!login) {
      res.render('login', {
        title: '登入'
      })
    }
    request.get(Host.user_info, {
      headers: {
        Cookie: req.headers.cookie
      }
    }, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        body = JSON.parse(body)
        /**获取用户用户名 */

        let user = body.nameForShow

        let obj = dataBase.queryUserReverse(user)
        let list = []
        for (let k in obj) {
          list.push({
            date: k,
            dish_id: obj[k]
          })
        }
        list = list.filter((v) => {
          return new Date(v.date).valueOf() >= new Date().valueOf() - 24 * 60 * 60 * 1000
        }).sort((a, b) => {
          return new Date(a.date) > new Date(b.date)
        }).map((v) => {
          v.dish_name = dataBase.queryDishNameById(v.dish_id)
          return v
        })

        res.render('user_reverse', {
          title: '我的预约',
          list: list
        })
      }
    })
  },

  /**
 * 用户预约收藏
 */
  async userFavorite(req, res) {
    let login = await Auth.login(req)
    if (!login) {
      res.render('login', {
        title: '登入'
      })
    }

    let user = await Auth.queryUserInfo(req)

    let obj = dataBase.queryUserFavorite(user)
    let list = []
    for (let k in obj) {
      list.push({
        dish_id: k,
        checked: obj[k].hasOwnProperty('checked') ? +obj[k].checked : 1
      })
    }
    list = list.map((v) => {
      v.dish_name = dataBase.queryDishNameById(v.dish_id)
      return v
    })

    res.render('user_favorite', {
      title: '我的收藏',
      list: list
    })
  },

  /**
   * 查询用户的预约
   * @param {context} req 
   * @param {context} res 
   */
  async userSetting(req, res) {
    /**登录钩子函数 */
    let login = await Auth.login(req)
    if (!login) {
      res.render('login', {
        title: '登入'
      })
    }

    /**查询用户信息 */
    let user = await Auth.queryUserInfo(req)

    /**查询用户的设置信息 */
    let setting = dataBase.queryUserSetting(user)

    res.render('setting', {
      title: '设置',
      data: setting
    })
  }
}

module.exports = Home