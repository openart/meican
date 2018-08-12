import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/',
      redirect: '/order-reverse'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/home',
          component: resolve => require(['@/views/home/index.vue'], resolve),
          meta: { title: '首页' }
        },
        {
          path: 'order-reverse',
          component: resolve => require(['@/views/reverse/index.vue'], resolve),
          meta: {
            title: '订单预约',
            login: true
          }
        },
        {
          path: 'my-reverse',
          component: resolve => require(['@/views/user/reverse/index.vue'], resolve),
          meta: {
            title: '我的预约',
            login: false
          }
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/views/login/index.vue'], resolve),
      meta: {
        title: '登录',
        login: false
      }
    }
  ]
})