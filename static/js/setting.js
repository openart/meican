$(() => {
  index.init()
})

/**全局对象 */
const index = {
  init() {
    this.bindEvent()
  },
  bindEvent() {
    // 提交选择数据
    $('body').on('click', '.switch', this.switchPower)
  },

  /**
   * 切换开关
   */
  switchPower() {
    let _this = this

    let params = {
      k: $(this).data('key'),
      v: $(this).hasClass('on') ? 0 : 1
    }

    $.ajax({
      url: '/api/submitSetting',
      data: params,
      success: function (data) {
        $(_this).toggleClass('on')
      }
    })
  }
}