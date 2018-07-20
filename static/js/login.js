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
    $('body').on('click', '#btn_login', this.login)
  },
  /**
   * 登录
   */
  login() {
    let user = $('#user').val()
    let pwd = $('#pwd').val()
    let code = $('#code').val()
    let rand = $('#rand').val()

    if (!user) {
      utils.showToast('用户名不能为空')
      return false
    }

    if (!pwd) {
      utils.showToast('密码不能为空')
      return false
    }

    $.ajax({
      url: '/api/login',
      data: {
        user: user,
        pwd: pwd,
        code: code,
        rand:rand
      },
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          window.location.href = '/order/reverse'
        } else if (+data.result == 1005) {
          let code = 'https://meican.com' + data.result_rows.code
          $('#rand').val(data.result_rows.rand)
          $('#img_code').attr('src', code).parent().show()
        } else {
          utils.showError(data)
        }
      }
    })
  }
}