import axios from 'axios'

import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })

export default axios.create({
  timeout: 8000,
  baseURL: 'http://localhost:5502/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformResponse: [function (res) {
    // 对 data 进行转换处理
    res = typeof res === 'string' ? JSON.parse(res) : res
    return res
  }]
})
