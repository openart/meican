var express = require('express')
var router = express.Router()

let sd = require('silly-datetime');

var Login = require('../controller/login')
var sendEmail = require('../controller/sendEmail')

const home = require('../controller/home')
const api = require('../controller/api')
const auth = require('../controller/auth')

/* GET home page. */
router.get('/', home.index)

/* GET home page. */
router.get('/login', home.login)

/**用户基础信息，实时查询 */
router.get('/user/info', home.userInfo)

/**用户列表 */
router.get('/user/list', home.userList)

/**用户预约 */
router.get('/user/reverse', home.userReverse)

/**订单预约 */
router.get('/order/reverse', home.orderReverse)

/**用户设置信息 */
router.get('/setting', home.userSetting)

/**关于 */
router.get('/about', home.about)

/**根据餐厅id查询食品列表 */
router.get('/api/queryFoodListById', api.queryFoodListById)

/**登录模块 */
router.get('/api/login', api.login)

/**提交订单预约 */
router.get('/api/submitOrderReverse', api.submitOrderReverse)

/**提交设置 */
router.get('/api/submitSetting', api.submitSetting)

module.exports = router
