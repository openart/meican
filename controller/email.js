// 获取邮件相关的配置文件
var email = require('../config').email.qq

// 引入nodemailer组件
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  host: email.host,
  port: 465,
  sercure: true,
  auth: {
    user: email.user,
    pass: email.password
  }
})

/**
 * 发送邮件
 * @param contents
 */
module.exports = {
  /**
   * 发送邮件
   */
  send: function (options) {
    transporter.sendMail({
      from: email.user,
      to: options.toUser,
      subject: options.title || '美餐点餐提醒',
      text: options.content || '无'
    }, function (error, response) {
      if (error) {
        console.log(error)
      } else {
        console.log("Message sent: " + response.response)
        cb && cb()
      }

      transporter.close() // 如果没用，关闭连接池
    })
  }
}