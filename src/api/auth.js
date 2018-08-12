import http from './http'

export default {
 /**
 * 登录鉴权
 * @wiki
 * @param {any} data 入参
 * @returns
 */
  isLogin(data) {
    let url = '/auth/isLogin'
    return http.get(url, data)
  },
  /**
   * 登录
   * @param {Object} 用户名密码 
   */
  login(data){
    let url = '/auth/login'
    return http.get(url, data)
  }
}