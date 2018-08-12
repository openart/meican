import apiReverse from "@/api/reverse"
import { request } from '@/utils'
export default {
  name: 'baseform',
  data: function () {
    return {
      list: []
    }
  },
  mounted() {
    this.queryUserReverse()
  },
  methods: {
    async queryUserReverse() {
      let res = await request({
        func: apiReverse.queryUserReverse
      })
      this.list = res
    }
  }
}