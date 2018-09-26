/**node资源库 */
let fs = require('fs')
const path = require('path')
const sd = require('silly-datetime')
extend = require('extend')

/**配置文件 */
const Path = require('../config/').path

/**
 * 数据库基础类
 */
let DataBase = {
  /**
   * 增加用户到数据库
   * @param {Object} params
   */
  updateUser(params) {
    let userList = this.queryUserList()
    let user = this.queryUserInfoByUser(params.user)
    let item = {
      user: params.user,
      remember: params.remember,
      expires: params.expires,
      uniqueId: params.uniqueId
    }
    // 存在则更新，如没有，则新增
    if (user.length > 0) {
      let index = (() => {
        for (let k in userList) {
          if (userList[k].user === user[0].user) return k
        }
        return -1
      })()
      // 设置注册时间与更新时间
      item.regist_time = user[0].regist_time
      item.update_time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      userList.splice(index, 1, item)
    } else {
      // 设置注册时间与更新时间
      let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      item.regist_time = date
      item.update_time = date
      userList.push(item)
    }
    fs.writeFileSync(Path.user, JSON.stringify(userList))
  },

  /**
   * 查询所有用户信息
   */
  queryUserList() {
    /**判断user文件不存在，如不存在，则不读取*/
    let isUserExists = fs.existsSync(Path.user)
    let file = null
    if (isUserExists) {
      file = fs.readFileSync(Path.user, 'utf-8')
    }

    /**数据为空，则数组为空 */
    if (!file) return []

    /**初始化用户数组 */
    let list = JSON.parse(file)
    const config = require('../config/')
    if (!config.is_test) return list
    let userList = list.filter((v) => {
      return config.test_user.indexOf(v.user) > -1
    })
    return userList
  },
  /**
   * 根据用户的账号查询用户是否保存信息
   * @param {*} account
   */
  queryUserInfoByUser(account) {
    let userList = this.queryUserList()

    let user = userList.filter((v) => {
      return v.user == account
    })
    return user
  },

  /**
   * 查询所有的餐品列表
   */
  queryAlldishs(date) {
    date = date ? date : sd.format(new Date(), 'YYYY-MM-DD')

    // 当天的数据在早上10：00 爬取，如果用户在10点前访问，依次向前取5天数据
    let file = Path.all_dishs + date
    let isexists = fs.existsSync(file)
    if (!isexists) {
      file = (() => {
        let d, p, e
        for (let i = 0; i < 5; i++) {
          d = (new Date).valueOf() - 24 * 60 * 60 * 1000 * (i + 1)
          p = Path.all_dishs + sd.format(d, 'YYYY-MM-DD')
          e = fs.existsSync(p)
          if (e) return p
        }
        return ''
      })()
    }
    if (!file) return []

    /**读取二进制文件 */
    let txt = fs.readFileSync(file, 'utf-8')

    return JSON.parse(txt)
  },
  /**
   * 保存预约数据到数据库中
   * @param {Object} params 
   */
  saveOrderReverse(params) {
    let fileNmae = params.user
    let path = Path.order_reverse + fileNmae

    /**判断预约的文件夹是否存在，如不存在，则创建 */
    if (!fs.existsSync(Path.order_reverse)) {
      fs.mkdirSync(Path.order_reverse)
    }

    /**
     * 判断文件是否存在
     * 存在就读取里面内容
     * 不存在则直接写入
     */
    let isexists = fs.existsSync(path)
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      let txt = fs.readFileSync(path)
      obj = JSON.parse(txt)
    }

    let data = params.data || {}
    obj[data.date] = data.food

    /**判断文件夹中是否有文件 */
    fs.writeFileSync(path, JSON.stringify(obj))
  },

  /**
   * 保存收藏数据到数据库中
   * @param {Object} params 
   */
  saveFoodFavorite(params) {
    let fileNmae = params.user
    let path = Path.my_favorite + fileNmae

    /**判断预约的文件夹是否存在，如不存在，则创建 */
    if (!fs.existsSync(Path.my_favorite)) {
      fs.mkdirSync(Path.my_favorite)
    }

    /**
     * 判断文件是否存在
     * 存在就读取里面内容
     * 不存在则直接写入
     */
    let isexists = fs.existsSync(path)
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      let txt = fs.readFileSync(path)
      obj = JSON.parse(txt)
    }

    let data = params.data || {}
    obj[data.food] = {
      checked: 1,
      valid: 1
    }

    /**写入数据库 */
    fs.writeFileSync(path, JSON.stringify(obj))
  },

  /**
   * 获取用户预约的订单列表
   * @param {String} user 
   */
  queryUserReverse(user) {
    /**用户预约文件存放地址 */
    let isexists = fs.existsSync(Path.user)

    /**如果不存在，则返回空 */
    if (!isexists) return {}
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      /**首先判断用户预约文件是否存在,如不存在，则直接返回空值 */
      let isUserExists = fs.existsSync(Path.order_reverse + user)
      if (!isUserExists) return {}
      let txt = fs.readFileSync(Path.order_reverse + user)
      obj = JSON.parse(txt)
    }
    return obj
  },

  /**
   * 获取用户收藏列表
   * @param {String} user 
   */
  queryUserFavorite(user) {
    /**用户预约文件存放地址 */
    let isexists = fs.existsSync(Path.user)

    /**如果不存在，则返回空 */
    if (!isexists) return {}
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      /**首先判断用户收藏文件是否存在,如不存在，则直接返回空值 */
      let isUserExists = fs.existsSync(Path.my_favorite + user)
      if (!isUserExists) return {}
      let txt = fs.readFileSync(Path.my_favorite + user)
      obj = JSON.parse(txt)
    }
    return obj
  },

  /**
   * 获取用户随机收藏餐品
   * @param {String} user 
   */
  queryRegularFavorite(user) {
    let obj = this.queryUserFavorite(user)
    let list = []
    for (let k in obj) {
      list.push(k)
    }

    /**过滤掉用户取消收藏的部分 */
    list = list.filter((v) => {
      return +obj[v].checked === 1 && +obj[v].valid === 1
    })

    /**随机浮动 */
    let index = parseInt(Math.random() * list.length)
    return list[index] || ''
  },

  /**
   * 获取同事常点的餐品
   */
  queryRegularDish(date) {
    date = date ? date : sd.format(new Date(), 'YYYY-MM-DD')
    let txt = fs.readFileSync(Path.fav_dishs + date)
    let list = JSON.parse(txt)
    if (list.length === 0) return ''

    let index = parseInt(Math.random() * list.length)
    return list[index].id || ''
  },
  /**
   * 根据餐饮的id查询名称
   * @param {String} id 
   */
  queryDishNameById(id) {
    let file = fs.readFileSync(Path.static_dishs, 'utf-8')
    let staticDishs = JSON.parse(file)
    return staticDishs[id] || ''
  },

  /**
   * 查询用户设置信息
   * @param {String} user 用户名
   */
  queryUserSetting(user) {
    let res = {
      wx_notice: 1,
      auto_checkin: 1
    }
    let isexits = fs.existsSync(Path.setting)
    if (!isexits) return res

    let txt = fs.readFileSync(Path.setting, 'utf-8')
    let obj = {}

    try {
      obj = JSON.parse(txt)
    } catch (e) { }

    return extend(res, obj[user]) || res
  },

  /**
   * 提交用户设置
   * @param {Object} params 设置参数对象
   */
  submitUserSetting(params) {
    let isexists = fs.existsSync(Path.setting)
    let allSetting = {}

    if (isexists) {
      /**读取文件内容 */
      let txt = fs.readFileSync(Path.setting)
      allSetting = (() => {
        let obj = {}
        try {
          return JSON.parse(txt)
        } catch (e) { }
        return {}
      })()
    }

    let userSetting = allSetting[params.user] || {}

    allSetting[params.user] = extend(userSetting, (() => {
      let obj = {}
      obj[params.k] = +params.v
      return obj
    })())

    fs.writeFileSync(Path.setting, JSON.stringify(allSetting))
  },

  /**
   * 修改收藏的状态
   * @param {*} params 设置参数对象
   */
  submitSwitchFavorite(params) {
    let fileNmae = params.user
    let path = Path.my_favorite + fileNmae

    /**
     * 判断文件是否存在
     * 存在就读取里面内容
     * 不存在则直接写入
     */
    let isexists = fs.existsSync(path)
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      let txt = fs.readFileSync(path)
      obj = JSON.parse(txt)
    }

    obj[params.id].checked = +params.checked

    /**写入数据库 */
    fs.writeFileSync(path, JSON.stringify(obj))
  },
  /**
   * 修改收藏的状态
   * @param {*} params 设置参数对象
   */
  setNoValid(params) {
    let fileNmae = params.user
    let path = Path.my_favorite + fileNmae

    /**
     * 判断文件是否存在
     * 存在就读取里面内容
     * 不存在则直接写入
     */
    let isexists = fs.existsSync(path)
    let obj = {}
    if (isexists) {
      /**读取文件内容 */
      let txt = fs.readFileSync(path)
      obj = JSON.parse(txt)
    }

    if (!obj[params.id]) return false
    obj[params.id].valid = 0

    /**写入数据库 */
    fs.writeFileSync(path, JSON.stringify(obj))
  },
  /**
   * 查询指定年月的假期
   * @param {String} date 日期
   */
  queryHoliday(date) {
    date = date ? date : sd.format(new Date(), 'YYYY-MM')
    console.log(date)
    let path = Path.calendar + date
    let isexists = fs.existsSync(path)
    if (!isexists) return []
    let txt = fs.readFileSync(path)
    obj = JSON.parse(txt)
    let holiday = obj.holiday.map((v) => {
      let list = v.list.map((val) => {
        val.name = v.name
        val.rest = v.rest
        val.desc = v.desc
        return val
      })
      return list
    })
    return [].concat.apply([], holiday)
  },
  /**
   * 保存订单数据到数据库中
   * @param {Array} data 订单数据
   */
  saveOrder(data) {
    let date = sd.format(new Date(), 'YYYY-MM-DD')
    /**判断文件夹是否存在，如不存在，则创建 */
    if (!fs.existsSync(Path.order)) {
      fs.mkdirSync(Path.order)
    }
    let path = Path.order + date
    fs.writeFileSync(path, JSON.stringify(data))
  }
}

module.exports = DataBase
