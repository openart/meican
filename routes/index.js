var express = require('express')
var router = express.Router()

const api = require('../controller/api')
const reverse = require('../controller/reverse')
const auth = require('../controller/auth')

/**判断用户是否登录 */
router.get('/api/auth/isLogin', api.queryFoodListById)

/**根据餐厅id查询食品列表 */
router.get('/api/queryFoodListById', api.queryFoodListById)

/**登录模块 */
router.get('/api/login', api.login)

/**提交订单预约 */
router.get('/api/submitOrderReverse', api.submitOrderReverse)

/**提交设置 */
router.get('/api/submitSetting', api.submitSetting)

/**根据餐品名称模糊查询食品列表 */
router.get('/api/queryFoodListByName', api.queryFoodListByName)

/**预约相关 */
router.get('/reverse/queryDates', reverse.queryDates)
router.get('/reverse/queryDishs', reverse.queryDishs)
router.get('/reverse/queyrFoodListByDishId', reverse.queyrFoodListByDishId)
router.get('/reverse/submitOrderReverse', reverse.submitOrderReverse)
router.get('/reverse/queryFoodListByName', reverse.queryFoodListByName)
router.get('/reverse/queryUserReverse', reverse.queryUserReverse)

/** 登录相关 */
router.get('/auth/login', auth.login)
router.get('/auth/isLogin', auth.isLogin)

module.exports = router
