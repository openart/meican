module.exports = {
  /**
 * 统一数据输出格式
 * @param {Object} data 
 */
  convert(data) {
    return {
      result: 0,
      result_info: 'ok',
      result_rows: data || {}
    }
  }
}