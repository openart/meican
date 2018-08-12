/**
 * 请求封装
 * @param {Object} options
 * @param {Function} repayData.queryFun 查询函数 必须
 * @param {Object} repayData.params 查询入参 非必须
 */
export default async (options) => {
  if (!options.func) {
    throw new Error('options.queryFun is required')
  }
  let ret
  // 请求异常判断
  try {
    ret = await options.func.call(this, {
      params: options.params
    } || {})
  } catch (error) {
    ret = {}
    throw error
  }
  // 数据异常判断
  if (ret.data && Number(ret.data.result) === 0) {
    return ret.data.result_rows
  } else {
  }
  return false
}
