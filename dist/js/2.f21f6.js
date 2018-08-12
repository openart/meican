webpackJsonp([2],{

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(205);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15f85d7c_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(227);
function injectStyle (ssrContext) {
  __webpack_require__(219)
}
var normalizeComponent = __webpack_require__(82)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-15f85d7c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15f85d7c_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(209);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__index__["a" /* default */]);

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [{
        title: "今天要修复100个bug",
        status: false
      }, {
        title: "今天要修复100个bug",
        status: false
      }, {
        title: "今天要写100行代码加几个bug吧",
        status: false
      }, {
        title: "今天要修复100个bug",
        status: false
      }, {
        title: "今天要修复100个bug",
        status: true
      }, {
        title: "今天要写100行代码加几个bug吧",
        status: true
      }, {
        title: "今天要写100行代码加几个bug吧",
        status: true
      }, {
        title: "今天要写100行代码加几个bug吧",
        status: true
      }, {
        title: "今天要写100行代码加几个bug吧",
        status: true
      }]
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  }
});

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(192)(false);
// imports


// module
exports.push([module.i, ".el-row[data-v-15f85d7c]{margin-bottom:20px}.grid-content[data-v-15f85d7c]{display:flex;align-items:center;height:100px}.grid-cont-right[data-v-15f85d7c]{flex:1;text-align:center;font-size:12px;color:#999}.grid-num[data-v-15f85d7c]{font-size:30px;font-weight:700}.grid-con-icon[data-v-15f85d7c]{font-size:50px;width:100px;height:100px;text-align:center;line-height:100px;color:#fff}.grid-con-1 .grid-con-icon[data-v-15f85d7c]{background:#2d8cf0}.grid-con-1 .grid-num[data-v-15f85d7c]{color:#2d8cf0}.grid-con-2 .grid-con-icon[data-v-15f85d7c]{background:#64d572}.grid-con-2 .grid-num[data-v-15f85d7c]{color:#2d8cf0}.grid-con-3 .grid-con-icon[data-v-15f85d7c]{background:#f25e43}.grid-con-3 .grid-num[data-v-15f85d7c]{color:#f25e43}.user-info[data-v-15f85d7c]{display:flex;align-items:center;padding-bottom:20px;border-bottom:2px solid #ccc;margin-bottom:20px}.user-avator[data-v-15f85d7c]{width:120px;height:120px;border-radius:50%}.user-info-cont[data-v-15f85d7c]{padding-left:50px;flex:1;font-size:14px;color:#999}.user-info-cont div[data-v-15f85d7c]:first-child{font-size:30px;color:#222}.user-info-list[data-v-15f85d7c]{font-size:14px;color:#999;line-height:25px}.user-info-list span[data-v-15f85d7c]{margin-left:70px}.mgb20[data-v-15f85d7c]{margin-bottom:20px}.todo-item[data-v-15f85d7c]{font-size:14px}.todo-item-del[data-v-15f85d7c]{text-decoration:line-through;color:#999}", ""]);

// exports


/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(214);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(193)("27985553", content, true, {});

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-row',{attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-row',[_c('el-col',[_c('el-card',{staticClass:"mgb20",attrs:{"shadow":"hover"}},[_c('div',{staticClass:"user-info"},[_c('img',{staticClass:"user-avator",attrs:{"src":"static/img/img.jpg","alt":""}}),_vm._v(" "),_c('div',{staticClass:"user-info-cont"},[_c('div',{staticClass:"user-info-name"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.role))])])]),_vm._v(" "),_c('div',{staticClass:"user-info-list"},[_vm._v("上次登录时间："),_c('span',[_vm._v("2018-01-01")])]),_vm._v(" "),_c('div',{staticClass:"user-info-list"},[_vm._v("上次登录地点："),_c('span',[_vm._v("东莞")])])]),_vm._v(" "),_c('el-card',{attrs:{"shadow":"hover"}},[_c('div',{staticClass:"clearfix",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("用户列表")])]),_vm._v("\n                        Vue\n                        "),_c('el-progress',{attrs:{"percentage":57.2,"color":"#42b983"}}),_vm._v("\n                        JavaScript\n                        "),_c('el-progress',{attrs:{"percentage":29.8,"color":"#f1e05a"}}),_vm._v("\n                        CSS\n                        "),_c('el-progress',{attrs:{"percentage":11.9}}),_vm._v("\n                        HTML\n                        "),_c('el-progress',{attrs:{"percentage":1.1,"color":"#f56c6c"}})],1)],1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":16}},[_c('el-row',{staticClass:"mgb20",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-card',{attrs:{"shadow":"hover","body-style":{padding: '0px'}}},[_c('div',{staticClass:"grid-content grid-con-1"},[_c('i',{staticClass:"el-icon-view grid-con-icon"}),_vm._v(" "),_c('div',{staticClass:"grid-cont-right"},[_c('div',{staticClass:"grid-num"},[_vm._v("1234")]),_vm._v(" "),_c('div',[_vm._v("用户访问量")])])])])],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-card',{attrs:{"shadow":"hover","body-style":{padding: '0px'}}},[_c('div',{staticClass:"grid-content grid-con-2"},[_c('i',{staticClass:"el-icon-message grid-con-icon"}),_vm._v(" "),_c('div',{staticClass:"grid-cont-right"},[_c('div',{staticClass:"grid-num"},[_vm._v("321")]),_vm._v(" "),_c('div',[_vm._v("系统消息")])])])])],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-card',{attrs:{"shadow":"hover","body-style":{padding: '0px'}}},[_c('div',{staticClass:"grid-content grid-con-3"},[_c('i',{staticClass:"el-icon-goods grid-con-icon"}),_vm._v(" "),_c('div',{staticClass:"grid-cont-right"},[_c('div',{staticClass:"grid-num"},[_vm._v("5000")]),_vm._v(" "),_c('div',[_vm._v("数量")])])])])],1)],1),_vm._v(" "),_c('el-card',{attrs:{"shadow":"hover"}},[_c('div',{staticClass:"clearfix",attrs:{"slot":"header"},slot:"header"},[_c('span',[_vm._v("待办事项")]),_vm._v(" "),_c('el-button',{staticStyle:{"float":"right","padding":"3px 0"},attrs:{"type":"text"}},[_vm._v("添加")])],1),_vm._v(" "),_c('el-table',{staticStyle:{"width":"100%","font-size":"14px"},attrs:{"data":_vm.todoList,"show-header":false,"height":"304"}},[_c('el-table-column',{attrs:{"width":"40"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-checkbox',{model:{value:(scope.row.status),callback:function ($$v) {_vm.$set(scope.row, "status", $$v)},expression:"scope.row.status"}})]}}])}),_vm._v(" "),_c('el-table-column',{scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"todo-item",class:{'todo-item-del': scope.row.status}},[_vm._v(_vm._s(scope.row.title))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"width":"60"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('i',{staticClass:"el-icon-edit"}),_vm._v(" "),_c('i',{staticClass:"el-icon-delete"})]}}])})],1)],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});