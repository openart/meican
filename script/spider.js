/**node组件库 */
const CronJob = require('cron').CronJob
const request = require('request')
const sd = require('silly-datetime')
const fs = require('fs')

/**配置文件 */
const Config = require('../config')

function Spider(date) {
  this.date = date ? date : sd.format(new Date(), 'YYYY-MM-DD')
}

Spider.prototype = {
  constructor: Spider,
  /**
   * 获取食物列表
   */
  async queryDishList() {
    let storeList = await this.queryStoreList()

    for (let i = 0; i < storeList.length; i++) {
      let uniqueId = storeList[i].uniqueId

      let foods = await this.queryFoodListByStore(uniqueId)

      storeList[i].list = foods
    }

    fs.writeFileSync(Config.path.all_dishs, JSON.stringify(storeList))

    /**同步更新静态资源餐饮文件 */
    this.updateStaticDishs(storeList)
    let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    console.log(date + '|' + '所有餐饮列表的脚本执行成功')
  },

  /**
   * 更新静态资源
   * @param {Object} storeList 
   */
  updateStaticDishs(storeList) {
    let path = Config.path.static_dishs

    // 判断文件夹是否存在，如不存在，只直接写入
    let isexists = fs.existsSync(path)
    let originData = {}
    if (isexists) originData = JSON.parse(fs.readFileSync(path))

    /**更新数据 */
    for (let i = 0; i < storeList.length; i++) {
      let list = storeList[i].list
      for (let k = 0; k < list.length; k++) {
        let key = list[k].id
        let val = list[k].name
        originData[key] = val
      }
    }

    /**保存数据 */
    fs.writeFileSync(path, JSON.stringify(originData))
    let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    console.log(date + '|' + '静态餐餐饮列表脚本执行成功')
  },

  /**
   * 获取餐饮列表
   */
  queryStoreList() {
    let params = {
      tabUniqueId: Config.spider.tabUniqueId,
      targetTime: this.date + ' 17:00'
    }

    return new Promise((resolve, reject) => {
      request.post(Config.host.restaurants, {
        headers: Config.spider.headers,
        form: params
      }, function (err, response, body) {
        body = JSON.parse(body)
        if (!err && response.statusCode == 200) {
          let list = body.restaurantList.map((v) => {
            return {
              uniqueId: v.uniqueId,
              name: v.name
            }
          })
          resolve(list)
        } else {
          reject()
        }
      })
    })
  },

  /**
   * 根据餐厅id查询食物名称
   */
  async queryFoodListByStore(id) {
    /**组织参数 */
    let params = {
      restaurantUniqueId: id,
      tabUniqueId: Config.spider.tabUniqueId,
      targetTime: this.date + ' 17:00'
    }
    return await new Promise((resolve, reject) => {
      request.post(Config.host.preorder, {
        headers: Config.spider.headers,
        form: params
      }, function (err, response, body) {
        body = JSON.parse(body)
        if (!err && response.statusCode == 200) {
          let dishList = body.dishList.filter((v) => {
            return !v.isSection
          }).map((v) => {
            return {
              id: v.id,
              name: v.name
            }
          })
          resolve(dishList)
        } else {
          reject()
        }
      })
    })
  },
  /**
   * 获取同时常点的食品列表
   * @param {String} date 
   */
  async queryRegularDishs() {
    /**组织参数 */
    let params = {
      tabUniqueId: Config.spider.tabUniqueId,
      targetTime: this.date + ' 17:00'
    }
    return await new Promise((resolve, reject) => {
      request.post(Config.host.regular, {
        headers: Config.spider.headers,
        form: params
      }, function (err, response, body) {
        body = JSON.parse(body)
        if (!err && response.statusCode == 200) {
          let dishList = (body.othersRegularDishList || []).map((v) => {
            return {
              id: v.id,
              name: v.name
            }
          })

          fs.writeFileSync(Config.path.fav_dishs, JSON.stringify(dishList))
          let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
          console.log(date + '|' + '同事常点的餐品列表脚本执行成功')
        } else {
          reject()
        }
      })
    })
  },
  /**
   * 获取用户的uniqueid
   * 获取当前的时间，获取日历列表，取最后一个指，即为晚餐
   */
  async queryUniqueId() {
    /**不可以爬取周日的数据
     * 尽量不去爬周日的数据。
     * 所以爬取离当前时间最近的周一 */

    let date = new Date()
    let weekday = +date.getDay()

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
        headers: Config.spider.headers,
        form: params
      }, function (err, response, body) {
        body = JSON.parse(body)
        if (!err && response.statusCode == 200) {
          let dateList = body.dateList[0]
          let calendarList = dateList.calendarItemList

          /**获取晚餐数据 */
          let dinner = calendarList[calendarList.length - 1]
          let uniqueId = dinner.userTab.uniqueId

          console.log(uniqueId)

        } else {
          reject()
        }
      })
    })
  }
}

module.exports = Spider