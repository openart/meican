/**
 * 初始化函数执行
 */
$(function () {
  home.init()
})

const home = {
  init() {
    this.queryFoodsById()
    this.bindEvent()
  },
  /**
   * 根据餐厅id查询食物列表
   * @param {String} id 
   */
  queryFoodsById() {
    let id = $('#dish').find('li.active').attr('value')
    $.ajax({
      url: '/api/queryFoodListById',
      data: {
        id: id
      },
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          let result_rows = data.result_rows

          let html = result_rows.map((v) => {
            return '<li class="bdr-bottom js-check-food" data-id=' +
              v.id + '><i></i><span>' +
              v.name + '</span></li>'
          }).join('')

          $('#food_list').html(html)
        } else {
          alert('获取食品列表出错')
        }
      }
    })
  },

  /**
   * 提交食品选择到数据库中
   */
  submitOrderReverse() {
    /**获取参数 */
    let date = $('#date').find('li.active').attr('value')
    let food = $('#food_list').find('li.active').data('id')

    if ($('#date').find('li').length === 0) {
      utils.showToast('当前时段不可点餐，请周一再试')
      return false
    }

    if (!food) {
      utils.showToast('请选择食品品类')
      return false
    }

    let params = {
      date: date,
      food: food
    }

    $.ajax({
      url: '/api/submitOrderReverse',
      timeout: 5000,
      data: params,
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          utils.showToast('提交预约成功')
        } else {
          utils.showToast('提交预约失败')
        }
      },
      error(xhr, status) {
        utils.showToast(status)
      }
    })
  },

  /**
   * 提交收藏
   */
  submitFoodFavorite() {
    /**获取参数 */
    let food = $('#food_list').find('li.active').data('id')

    if (!food) {
      utils.showToast('请选择食品品类')
      return false
    }

    let params = {
      food: food
    }

    $.ajax({
      url: '/api/submitFoodFavorite',
      timeout: 5000,
      data: params,
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          utils.showToast('提交收藏成功')
        } else {
          utils.showToast('提交收藏失败')
        }
      },
      error(xhr, status) {
        utils.showToast(status)
      }
    })
  },

  /**
   * 模糊查询
   */
  queryFoodListByName: function (name) {
    let params = {
      name: name
    }
    $.ajax({
      url: '/api/queryFoodListByName',
      timeout: 5000,
      data: params,
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          let result_rows = data.result_rows

          let html = result_rows.map((v) => {
            return v.list.map((val) => {
              return '<li class="bdr-bottom js-check-food" data-id=' +
                val.id + '><i></i><span>' +
                val.name + '</span><span data-id='+ v.uniqueId +'>' + v.name + '</span></li>'
            }).join('')
          }).join('')

          $('#food_list').html(html)
        } else {
          alert('获取食品列表出错')
        }
      },
      error(xhr, status) {
        utils.showToast(status)
      }
    })
  },

  /**
   * 绑定事件
   */
  bindEvent() {
    let _this = this
    let flag = true
    /**餐厅的click事件 */
    $('#dish li').on('click', function () {
      $('#search').val('')
      $(this).addClass('active').siblings().removeClass('active')
      _this.queryFoodsById()
    })

    /**时间选择事件 */
    $('#date li').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
    })

    /**用户选择食品的类切换事件 */
    $('body').on('click', '.js-check-food', function () {
      $(this).addClass('active').siblings().removeClass('active')
    })

    $('#search').on('compositionstart',function(){
      flag = false
    })

    $('#search').on('compositionend',function(){
      console.log(flag)
      flag = true
    })

    $('#search').on('input propertychange', function () {
      setTimeout(()=>{
        if (!flag) return false
        let name = $(this).val()
        console.log(name)
        _this.queryFoodListByName(name.replace(/(^\s*)|(\s*$)/g, ''))
      }, 0)
    })

    // 提交选择数据
    $('body').on('click', '.js-submit-food', this.submitOrderReverse)
    $('body').on('click', '.js-submit-favorite', this.submitFoodFavorite)
  }
}