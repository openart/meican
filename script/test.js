/**
 * 测试脚本，用于日常数据的测试
 */
let arguments = process.argv.splice(2);
console.log(+arguments[0])



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
  let config = require('../config/')
  let user = config.admin.map((v) => {
    return v.split('@')[0]
  }).join('|')
  workWx.send({
    user: user,
    description: '美餐点餐提醒\r\n在电脑上点击即可预定一周的美食\r\n<a href="http://10.1.19.174:3001/order/reverse">开始点餐</a>'
  })
}

function sendMessage() {
  message.send()
}


function testConfig() {
  console.log(process.cwd())
  console.log(require('../config/').root)
}