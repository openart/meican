/**
 * 餐饮列表脚本
 * 1、获取所以的餐饮列表
 * 2、获取同事常点的餐饮列表
 */

/**引入任务组件 */
const Spider = require('./spider')
const sd = require('silly-datetime')

/**因为周日没数据，所以周日顺延一天 */
let now = (new Date()).valueOf()
let weekday = +(new Date()).getDay()
if (weekday == 0) now += 24 * 60 * 60 * 1000

/**执行脚本 */
let date = sd.format(now, 'YYYY-MM-DD')
let spider = new Spider(date)
spider.queryRegularDishs()
spider.queryDishList()
