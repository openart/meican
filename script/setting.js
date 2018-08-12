/**文件系统模块 */
const fs = require('fs')

/**配置文件 */
const Path = require('../config').path

/**
 * 设置类
 */
const Setting = {
  /**初始化setting */
  reset() {
    let isexits = fs.existsSync(Path.setting)
    if (!isexits) return false
    fs.unlinkSync(Path.setting)
  }
}

module.exports = Setting