import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import lazy from 'vue-lazy-image'
import App from './App'
import store from './store'
import router from './router/index'

import apiAuth from "@/api/auth"
import { request } from '@/utils'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })

Vue.use(lazy)
sync(store, router)

Vue.config.debug = true

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // 登录判断
  if (to.matched.some(record => record.meta.login)) {
    request({
      func: apiAuth.isLogin
    }).then(res => {
      if (res.login !== 1) return false
      next()
    })
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  name: 'zhihu',
  router,
  store,
  render(h) {
    return h(App)
  }
})

export { app, router, store }