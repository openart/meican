import apiReverse from "@/api/reverse"
import { request } from '@/utils'
export default {
  name: 'baseform',
  data: function () {
    return {
      dateList: [],
      dishList: [],
      form: {
        date: '',
        dish: '',
        search: ''
      },
      foodList: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    formDish() {
      return this.form.dish
    },
    formSearch() {
      return this.form.search
    }
  },
  watch: {
    formDish(val) {
      this.queyrFoodListByDishId()
    },
    formSearch(val) {
      this.queryFoodListByName()
    }
  },
  methods: {
    async init() {
      this.dateList = await request({
        func: apiReverse.queryDates
      })
      this.form.date = this.dateList[0].k
      this.dishList = await request({
        func: apiReverse.queryDishs
      })
      this.form.dish = this.dishList[0].id
    },
    async queyrFoodListByDishId() {
      let id = this.form.dish
      if (!id) return false
      this.foodList = await request({
        func: apiReverse.queyrFoodListByDishId,
        params: {
          id: id
        }
      })
    },
    async submitOrderReverse(data) {
      let res = await request({
        func: apiReverse.submitOrderReverse,
        params: {
          date: this.form.date,
          food: data.id
        }
      })
      this.$notify({
        title: '成功',
        message: '预约成功',
        type: 'success'
      });
    },
    async queryFoodListByName() {
      let res = await request({
        func: apiReverse.queryFoodListByName,
        params: {
          name: this.form.search
        }
      })
      this.foodList = res
    }
  }
}