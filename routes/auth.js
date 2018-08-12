var express = require('express')
var router = express.Router()

const auth = require('../controller/auth')

/**判断用户是否登录 */
router.get('/isLogin', auth.isLogin)


module.exports = router
