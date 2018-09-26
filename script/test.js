/**
 * 测试脚本，用于日常数据的测试
 */
let arguments = process.argv.splice(2);
console.log(+arguments[0])


const fs = require('fs')
const sd = require('silly-datetime')
const dataBase = require('../controller/dataBase')
const message = require('./message')
const workWx = require('../controller/workWx')

switch (+arguments[0]) {
  case 1:
    checkIn()
    break
  case 2:
    sendEmail()
    break
  case 3:
    crawlDishs()
    break
  case 4:
    sendWorkWx()
    break
  case 5:
    sendMessage()
    break
  case 6:
    testConfig()
    break
  case 7:
    resetSetting()
    break
  case 8:
    wishFavData()
  case 9:
    wishUserData()
    break
  case 10:
    checkCalendar()
    break
  case 11:
    queryHoliday()
    break
  case 12:
    testHoliday()
    break
  case 13:
    testTemplate()
}

/**
 * 点餐脚本测试
 */
function checkIn() {
  const checkIn = require('../script/checkin')
  checkIn.begin()
}


/**
 * 邮件测试
 */
function sendEmail() {
  let config = require('../config/')
  let user = config.admin.join(',')
  const email = require('../controller/email')
  email.send({
    title: '美餐邮件',
    content: ' 成功\r\n哈哈',
    toUser: user
  })
}


/**
 * 抓取数据测试
 */
function crawlDishs() {
  const sd = require('silly-datetime')
  const Spider = require('./spider')
  let now = +new Date()
  let date = sd.format(now, 'YYYY-MM-DD')
  let spider = new Spider(date)
  spider.queryRegularDishs()
  spider.queryDishList()
}

/**
 * 发送企业微信数据测试
 */
function sendWorkWx() {
  let list = dataBase.queryUserList()
  console.log(list)
  let user = list.map((v) => {
    return v.user.split('@')[0]
  }).join('|')
  workWx.send({
    user: user,
    description: '鉴于每周五很多同学会回家吃饭，为避免资源的浪费，如果用户不需要点餐，可通过<a href="http://10.1.19.174:3001/setting">菜单--设置</a>选项取消自动点餐'
  })
}

function sendMessage() {
  let params = {
    message: '鉴于每周五很多同学会回家吃饭，为避免资源的浪费，如果用户不需要点餐，可通过<a href="http://10.1.19.174:3001/setting">菜单--设置</a>选项取消自动点餐'
  }
  message.send(params)
}


function testConfig() {
  let list = dataBase.queryUserList()
  console.log(list)
}

function resetSetting() {
  const Setting = require('../script/setting')
  Setting.reset()
}

function wishFavData() {
  const path = require('../config').path
  let files = fs.readdirSync(path.my_favorite)
  for (let i = 0; i < files.length; i++) {
    let p = path.my_favorite + files[i]

    let txt = fs.readFileSync(p)
    obj = JSON.parse(txt)
    for (let k in obj) {
      obj[k].valid = 1
    }

    /**写入数据库 */
    fs.writeFileSync(p, JSON.stringify(obj))
  }
}

function wishUserData() {
  const path = require('../config').path
  let userList = dataBase.queryUserList()
  userList = userList.map((v) => {
    let date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    v.regist_time = date
    v.update_time = date
    return v
  })
  fs.writeFileSync(path.user, JSON.stringify(userList))
}

function checkCalendar() {
  const calendar = require('./calendar')
  calendar.checkCalendar('2018-09')
  calendar.checkCalendar('2018-10')
  calendar.checkCalendar('2018-11')
  calendar.checkCalendar('2018-12')
}

function queryHoliday() {
  let holiday = dataBase.queryHoliday()
  const sd = require('silly-datetime')
  let date = sd.format(new Date(), 'YYYY-M-DD')
  date = '2018-9-24'
  let today = holiday.filter(v => {
    return v.date === date
  })
  if (today.length > 0) {
    let item = today[0]
    let status = parseInt(item.status)
    switch (status) {
      case 1:
        console.log('sendmessage')
        let params = {
          message: `今天是${item.name}，脚本将不执行自动点餐，如有需要，请至美餐app中手动点取，大家假期愉快\r\n${item.desc}\r\n${item.rest}`
        }
        console.log(params)
        message.send(params)
        break
      case 2:
        console.log('checkin')
    }
  } else {
    let day = new Date().getDay()
    if ([1, 2, 3, 4, 5].indexOf(day) === -1) return
    console.log('checkin')
  }
}

// 测试节假日脚本
function testHoliday() {
  let holiday = dataBase.queryHoliday()
  let date = sd.format(new Date(), 'YYYY-M-DD')
  let today = holiday.filter(v => {
    return v.date === date
  })
  if (today.length > 0) {
    let item = today[0]
    let status = parseInt(item.status)
    switch (status) {
      case 1:
        let params = {
          message: `今天是${item.name}，脚本将不执行自动点餐，如有需要，请至美餐app中手动点取，大家假期愉快\r\n${item.desc}\r\n${item.rest}`
        }
        console.log('发送信息')
        break
      case 2:
        console.log('补休点餐')
    }
  } else {
    // 周一到周五执行点餐
    let day = new Date().getDay()
    console.log(day)
    if ([1, 2, 3, 4, 5].indexOf(day) === -1) return
    console.log('正常周一至周五点餐')
  }
}

function testTemplate() {
  function getTemp() {
    return `你好，${username}`
  }
  let username = '张三'
  console.log(getTemp())
}