/**node资源库 */
let fs = require('fs')
const path = require('path')
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
    let userStr = params.user + ' ' + params.remember + ' ' + params.expires + ' ' + params.uniqueId + '\r'
    fs.appendFileSync(Path.user, userStr)
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
    let userList = []
    let list = file.split('\r')
    for (let i = 0; i < list.length; i++) {
      let items = list[i].replace('\n', '').split(' ')
      if (items.length != 4) continue

      /**判断是否测试环境，实时拉取数据 */
      const config = require('../config/')
      if (config.is_test && config.test_user.indexOf(items[0]) == -1) continue

      /**将当前用户插入数组中 */
      userList.push({
        user: items[0],
        remember: items[1],
        expires: items[2],
        uniqueId: items[3]
      })
    }
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
  queryAlldishs() {
    /**读取二进制文件 */
    let file = fs.readFileSync(Path.all_dishs, 'utf-8')

    return JSON.parse(file)
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
    obj[data.food] = {}

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
    let index = parseInt(Math.random() * list.length)
    return list[index] || ''
  },

  /**
   * 获取同事常点的餐品
   */
  queryRegularDish() {
    let txt = fs.readFileSync(Path.fav_dishs)
    let list = JSON.parse(txt)

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
  }
}

module.exports = DataBase
