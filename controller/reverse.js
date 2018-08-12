/**工具库 */
const utils = require('./utils')
const sd = require('silly-datetime')

/**数据库模块 */
const dataBase = require('../controller/dataBase')
const Auth = require('../controller/Auth')

/**
 * 授信模块
 */
const Reverse = {
  /**
   * 获取可预约的时间列表
   */
  queryDates(req, res) {
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
    res.json(utils.convert(dates))
  },
  /**
   * 获取可预约的餐厅列表
   * @param {context} req 
   * @param {context} res 
   */
  queryDishs(req, res) {
    /**获取餐厅列表 */
    let dishList = dataBase.queryAlldishs().map((v) => {
      return {
        id: v.uniqueId,
        name: v.name
      }
    })
    res.json(utils.convert(dishList))
  },
  /**
   * 根据餐厅id查询餐餐品列表
   * @param {context} req 
   * @param {context} res 
   */
  queyrFoodListByDishId(req, res) {
    let id = req.query.id
    console.log(id)
    let dishList = dataBase.queryAlldishs()

    let dishInfo = dishList.filter((v) => {
      return v.uniqueId == id
    }) || []

    let foods = dishInfo.length > 0 ? dishInfo[0] : {}

    let list = (foods.list || []).map((v) => {
      v.dish_id = foods.uniqueId
      v.dish_name = foods.name
      return v
    })
    res.json(utils.convert(list ? list : []))
  },
  /**
   * 提交预约
   */
  async submitOrderReverse(req, res) {
    let query = req.query

    /**查询用户信息 */
    let user = await Auth.queryUserInfo(req)
    /**保存数据到数据库中 */
    dataBase.saveOrderReverse({
      user: user,
      data: query
    })
    res.json(utils.convert())
  },
  /**
   * 根据餐品名称模糊查询查询食品列表
   * @param {String} id 
   */
  queryFoodListByName(req, res) {
    let name = req.query.name
    let dishList = dataBase.queryAlldishs()

    let dishInfo = dishList.map((v) => {
      v.list = v.list.filter((val) => {
        return val.name.indexOf(name) > -1
      })
      return v
    }).filter((v) => {
      return v.list.length > 0
    })

    let resData = dishInfo.map((v) => {
      return v.list.map((val) => {
        val.dish_id = v.uniqueId
        val.dish_name = v.name
        return val
      })
    })

    res.json(utils.convert([].concat(...resData)))
  },
  async queryUserReverse(req, res) {
    /**查询用户信息 */
    let user = await Auth.queryUserInfo(req)
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
    res.json(utils.convert(list))
  }
}

module.exports = Reverse