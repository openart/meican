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
    let id = $('#dish').val()
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
  submitFood() {
    /**获取参数 */
    let date = $('#date').val()
    let food = $('#food_list').find('li.active').data('id')

    if ($('#date').find('option').length === 0) {
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
   * 绑定事件
   */
  bindEvent() {
    /**餐厅的select change事件 */
    $('#dish').on('change', this.queryFoodsById)

    /**用户选择食品的类切换事件 */
    $('body').on('click', '.js-check-food', function () {
      $(this).addClass('active').siblings().removeClass('active')
    })

    // 提交选择数据
    $('body').on('click', '.js-submit-food', this.submitFood)
  }
}