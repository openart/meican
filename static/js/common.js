let utils = {}
// 显示toast
utils.showToast = function (msg, duration) {
  var toastTip = document.querySelector('#normal-toast-tip')
  if (toastTip) {
    document.querySelector('#normal-toast-tip .toast-content').innerText = msg
    toastTip.style.opacity = 1
  } else {
    // toast
    toastTip = document.createElement('div')
    toastTip.id = 'normal-toast-tip'
    toastTip.className = 'transition-opacity'
    // 内容
    var content = document.createElement('div')
    content.className = 'toast-content'
    content.innerText = msg
    document.body.appendChild(toastTip).appendChild(content)
  }
  setTimeout(function () {
    utils.hideToast()
  }, duration || 2500)
}
utils.showError = function (obj) {
  utils.showToast('[' + obj.result + ']' + obj.result_info)
}
// 隐藏toast
utils.hideToast = function () {
  var toastTip = document.querySelector('#normal-toast-tip')
  toastTip.style.opacity = 0
}


/**
 * 菜单按钮的显示与隐藏
 */

function initMenuEvent() {
  $(document).on('click', '.js-menu-list li', function () {
    window.location.href = $(this).attr('href')
  })

  let menuList = $('.js-menu-list li')
  let relUrl=getUrlRelativePath()
  for (let i = 0; i < menuList.length; i++) {
    let dom = $(menuList[i])
    let href = dom.attr('href')
    if (relUrl === href) dom.addClass('active')

  }
}
function getUrlRelativePath() {
  let url = document.location.toString()
  let arrUrl = url.split("//")
  let start = arrUrl[1].indexOf("/")
  let relUrl = arrUrl[1].substring(start)
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0]
  }
  return relUrl
}

initMenuEvent()