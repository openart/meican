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
    $('body').on('click', '.js-cancel-favorite', this.switchFavorite)
  },

  /**
   * 切换收藏
   */
  switchFavorite() {
    let _this = this
    let params = {
      id: $(this).data('id'),
      checked: $(this).hasClass('checked') ? 0 : 1
    }

    $.ajax({
      url: '/api/switchFavorite',
      data: params,
      success: function (data) {
        $(_this).toggleClass('checked')
      }
    })
  }
}