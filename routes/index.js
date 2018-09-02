var express = require('express')
var router = express.Router()

const home = require('../controller/home')
const api = require('../controller/api')

/* GET home page. */
router.get('/', home.index)

/* GET home page. */
router.get('/login', home.login)

/**用户基础信息，实时查询 */
router.get('/user/info', home.userInfo)

/**用户列表 */
router.get('/user/list', home.userList)

/**我的预约 */
router.get('/user/reverse', home.userReverse)

/**我的收藏 */
router.get('/user/favorite', home.userFavorite)

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

/**提交餐品收藏 */
router.get('/api/submitFoodFavorite', api.submitFoodFavorite)

/**提交设置 */
router.get('/api/submitSetting', api.submitSetting)

/**根据餐品名称模糊查询食品列表 */
router.get('/api/queryFoodListByName', api.queryFoodListByName)

/**切换收藏 */
router.get('/api/switchFavorite', api.switchFavorite)

module.exports = router
