import http from './http'

export default {
  queryDates(data) {
    let url = '/reverse/queryDates'
    return http.get(url, data)
  },
  queryDishs(data) {
    let url = '/reverse/queryDishs'
    return http.get(url, data)
  },
  queyrFoodListByDishId(data){
    let url = '/reverse/queyrFoodListByDishId'
    return http.get(url, data)
  },
  submitOrderReverse(data){
    let url = '/reverse/submitOrderReverse'
    return http.get(url, data)
  },
  queryFoodListByName(data){
    let url = '/reverse/queryFoodListByName'
    return http.get(url, data)
  },
  queryUserReverse(data){
    let url = '/reverse/queryUserReverse'
    return http.get(url, data)
  }
}