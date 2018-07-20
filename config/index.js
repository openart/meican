/**node组件库 */
const extend = require('extend')
const fs = require('fs')

/**配置文件 */
const public = require('./public')
const private = require('./private')

/**扩展对象 */
module.exports = extend(public, private)