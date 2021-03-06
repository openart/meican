/**
 * 测试脚本，用于日常数据的测试
 */
let arguments = process.argv.splice(2);
console.log(+arguments[0])



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
}

/**
 * 点餐脚本测试
 */
function checkIn() {
  const CheckIn = require('../script/checkin')
  CheckIn.begin()
}


/**
 * 邮件测试
 */
function sendEmail() {
  let config = require('../config/')
  let user = config.admin.join(',')
  const sendEmail = require('../controller/sendEmail')
  sendEmail({
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