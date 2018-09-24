/**根目录 */
const root = process.cwd()

/**输出配置文件 */
module.exports = {
  path: {
    user: root + '/database/user',
    all_dishs: root + '/database/all_dishs',
    fav_dishs: root + '/database/fav_dishs',
    static_dishs: root + '/database/static_dishs',
    order_reverse: root + '/database/order_reverse/',
    my_favorite: root + '/database/my_favorite/',
    setting: root + '/database/setting',
    calendar: root + '/database/calendar/'
  },
  host: {
    /**判断用户是否登录 */
    basic: 'https://www.meican.com/preorder/basic',
    /**获取用户的uniqueid */
    uniqueid: 'https://meican.com/preorder/api/v2.1/calendarItems/list',
    /**用户基本信息查询，入参cookie */
    user_info: 'https://meican.com/preorder/api/v2.1/accounts/show',
    /**登录 */
    login: 'https://meican.com/account/directlogin',
    /**下单 */
    order: 'https://meican.com/preorder/api/v2.1/orders/add',
    /**推荐列表 */
    recommend: 'https://www.meican.com/preorder/api/v2.1/recommendations/dishes',
    /**所有餐饮列表 */
    restaurants: 'https://meican.com/preorder/api/v2.1/restaurants/list',
    /**根据餐厅id查询餐厅支持的食物列表 */
    preorder: 'https://meican.com/preorder/api/v2.1/restaurants/show',
    /**同事常点的餐饮列表 */
    regular: 'https://meican.com/preorder/api/v2.1/recommendations/dishes',
    /**下单接口 */
    checkin: 'https://meican.com/preorder/api/v2.1/orders/add',
    /**获取验证码，美餐登录页面 */
    veritifyCode: 'https://meican.com/login',
    /** 爬取日历，每月1号执行 */
    calendar: 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php'
  }
}