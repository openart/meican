/**
 * 初始化函数执行
 */
$(function () {
  home.init()
})

const home = {
  init() {
    this.bindEvent()
  },
  /**
   * 获取数据集合
   * @param {String} id 
   */
  queryDataSetBypath(params) {
    $.ajax({
      url: '/api/queryDataSetBypath',
      data: params,
      success: function (data) {
        data = JSON.parse(data)
        if (+data.result == 0) {
          let preData = data.result_rows
          $('#pre_wrap').html(home.syntaxHighlight(preData))
        } else {
          alert('数据出错')
        }
      }
    })
  },

  /**
   * 绑定事件
   */
  bindEvent() {
    /**餐厅的select change事件 */
    $('#root').on('change', function () {
      let params = {}
      let list = $("#root").find("option:checked").data('list')
      if (!list) {
        params = {
          root: $("#root").find("option:checked").val()
        }
        home.queryDataSetBypath(params)
        $('#file').parent().hide()
        return
      }
      list = JSON.parse(list)
      let html = list.map(v => {
        return '<option value="' + v + '" class="bdr-bottom">' + v + '</option>'
      }).join('')
      $('#file').html(html)
      $('#file').trigger('change')
    })
    $('#file').on('change', function () {
      let params = {
        root: $("#root").find("option:checked").val(),
        file: $("#file").find("option:checked").val()
      }
      home.queryDataSetBypath(params)
    })
    $('#root').trigger('change')
  },
  // 序列化数据
  syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2)
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
  }
}