webpackJsonp([0],{

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(202);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f0d58bf_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(228);
var normalizeComponent = __webpack_require__(82)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1f0d58bf_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);


// 使用 Event Bus
const bus = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]();

/* harmony default export */ __webpack_exports__["a"] = (bus);

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_bus__ = __webpack_require__(199);
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      __WEBPACK_IMPORTED_MODULE_0__common_bus__["a" /* default */].$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
});

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Header_vue__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sidebar_vue__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Tags_vue__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bus__ = __webpack_require__(199);
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





/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead: __WEBPACK_IMPORTED_MODULE_0__Header_vue__["a" /* default */],
    vSidebar: __WEBPACK_IMPORTED_MODULE_1__Sidebar_vue__["a" /* default */],
    vTags: __WEBPACK_IMPORTED_MODULE_2__Tags_vue__["a" /* default */]
  },
  created() {
    __WEBPACK_IMPORTED_MODULE_3__bus__["a" /* default */].$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    __WEBPACK_IMPORTED_MODULE_3__bus__["a" /* default */].$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
});

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_bus__ = __webpack_require__(199);
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      collapse: false,
      items: [{
        icon: "el-icon-menu",
        index: "home",
        title: "首页"
      }, {
        icon: "el-icon-edit",
        index: "order-reverse",
        title: "预约"
      }, {
        icon: "el-icon-tickets",
        index: "my-reverse",
        title: "我的预约"
      }, {
        icon: "el-icon-star-on",
        index: "my-fav",
        title: "收藏"
      }, {
        icon: "el-icon-setting",
        index: "setting",
        title: "设置"
      }]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    __WEBPACK_IMPORTED_MODULE_0__common_bus__["a" /* default */].$on("collapse", msg => {
      this.collapse = msg;
    });
  }
});

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bus__ = __webpack_require__(199);
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


/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            tagsList: []
        };
    },
    methods: {
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            } else {
                this.$router.push('/');
            }
        },
        // 关闭全部标签
        closeAll() {
            this.tagsList = [];
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            });
            this.tagsList = curItem;
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            });
            !isExist && this.tagsList.push({
                title: route.meta.title,
                path: route.fullPath,
                name: route.matched[1].components.default.name
            });
            __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].$emit('tags', this.tagsList);
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
    computed: {
        showTags() {
            return this.tagsList.length > 0;
        }
    },
    watch: {
        $route(newValue, oldValue) {
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
    }
});

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(192)(false);
// imports


// module
exports.push([module.i, ".sidebar[data-v-14a893b0]{display:block;position:absolute;left:0;top:70px;bottom:0;overflow-y:scroll}.sidebar[data-v-14a893b0]::-webkit-scrollbar{width:0}.sidebar-el-menu[data-v-14a893b0]:not(.el-menu--collapse){width:250px}.sidebar>ul[data-v-14a893b0]{height:100%}", ""]);

// exports


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(192)(false);
// imports


// module
exports.push([module.i, ".tags{position:relative;height:30px;overflow:hidden;background:#fff;padding-right:120px}.tags ul{box-sizing:border-box;width:100%;height:100%}.tags-li{float:left;margin:3px 5px 2px 3px;border-radius:3px;font-size:12px;overflow:hidden;cursor:pointer;height:23px;line-height:23px;border:1px solid #e9eaec;background:#fff;padding:0 5px 0 12px;vertical-align:middle;color:#666;-webkit-transition:all .3s ease-in;-moz-transition:all .3s ease-in;transition:all .3s ease-in}.tags-li:not(.active):hover{background:#f8f8f8}.tags-li.active{color:#fff}.tags-li-title{float:left;max-width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:5px;color:#666}.tags-li.active .tags-li-title{color:#fff}.tags-close-box{position:absolute;right:0;top:0;box-sizing:border-box;padding-top:1px;text-align:center;width:110px;height:30px;background:#fff;box-shadow:-3px 0 15px 3px rgba(0,0,0,.1);z-index:10}", ""]);

// exports


/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(192)(false);
// imports


// module
exports.push([module.i, ".header[data-v-ae7dbfbe]{position:relative;box-sizing:border-box;width:100%;height:70px;font-size:22px;color:#fff}.collapse-btn[data-v-ae7dbfbe]{float:left;padding:0 21px;cursor:pointer;line-height:70px}.header .logo[data-v-ae7dbfbe]{float:left;width:250px;line-height:70px}.header-right[data-v-ae7dbfbe]{float:right;padding-right:50px}.header-user-con[data-v-ae7dbfbe]{display:flex;height:70px;align-items:center}.btn-fullscreen[data-v-ae7dbfbe]{transform:rotate(45deg);margin-right:5px;font-size:24px}.btn-bell[data-v-ae7dbfbe],.btn-fullscreen[data-v-ae7dbfbe]{position:relative;width:30px;height:30px;text-align:center;border-radius:15px;cursor:pointer}.btn-bell-badge[data-v-ae7dbfbe]{position:absolute;right:0;top:-2px;width:8px;height:8px;border-radius:4px;background:#f56c6c;color:#fff}.btn-bell .el-icon-bell[data-v-ae7dbfbe]{color:#fff}.user-name[data-v-ae7dbfbe]{margin-left:10px}.user-avator[data-v-ae7dbfbe]{margin-left:20px}.user-avator img[data-v-ae7dbfbe]{display:block;width:40px;height:40px;border-radius:50%}.el-dropdown-link[data-v-ae7dbfbe]{color:#fff;cursor:pointer}.el-dropdown-menu__item[data-v-ae7dbfbe]{text-align:center}", ""]);

// exports


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(213);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(193)("63503190", content, true, {});

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(215);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(193)("4da836ce", content, true, {});

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(217);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(193)("560537ee", content, true, {});

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__ = __webpack_require__(201);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ae7dbfbe_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Header_vue__ = __webpack_require__(233);
function injectStyle (ssrContext) {
  __webpack_require__(222)
}
var normalizeComponent = __webpack_require__(82)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ae7dbfbe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ae7dbfbe_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sidebar_vue__ = __webpack_require__(203);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14a893b0_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Sidebar_vue__ = __webpack_require__(226);
function injectStyle (ssrContext) {
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(82)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-14a893b0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Sidebar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_14a893b0_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Sidebar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Tags_vue__ = __webpack_require__(204);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a2f5dd5_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Tags_vue__ = __webpack_require__(229);
function injectStyle (ssrContext) {
  __webpack_require__(220)
}
var normalizeComponent = __webpack_require__(82)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Tags_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a2f5dd5_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Tags_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidebar"},[_c('el-menu',{staticClass:"sidebar-el-menu",attrs:{"default-active":_vm.onRoutes,"collapse":_vm.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"","router":""}},[_vm._l((_vm.items),function(item){return [(item.subs)?[_c('el-submenu',{key:item.index,attrs:{"index":item.index}},[_c('template',{slot:"title"},[_c('i',{class:item.icon}),_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(item.title))])]),_vm._v(" "),_vm._l((item.subs),function(subItem,i){return _c('el-menu-item',{key:i,attrs:{"index":subItem.index}},[_vm._v("\n                        "+_vm._s(subItem.title)+"\n                    ")])})],2)]:[_c('el-menu-item',{key:item.index,attrs:{"index":item.index}},[_c('i',{class:item.icon}),_c('span',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(item.title))])])]]})],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper"},[_c('v-head'),_vm._v(" "),_c('v-sidebar'),_vm._v(" "),_c('div',{staticClass:"content-box",class:{'content-collapse':_vm.collapse}},[_c('v-tags'),_vm._v(" "),_c('div',{staticClass:"content"},[_c('transition',{attrs:{"name":"move","mode":"out-in"}},[_c('router-view')],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showTags)?_c('div',{staticClass:"tags"},[_c('ul',_vm._l((_vm.tagsList),function(item,index){return _c('li',{key:index,staticClass:"tags-li",class:{'active': _vm.isActive(item.path)}},[_c('router-link',{staticClass:"tags-li-title",attrs:{"to":item.path}},[_vm._v("\n                "+_vm._s(item.title)+"\n            ")]),_vm._v(" "),_c('span',{staticClass:"tags-li-icon",on:{"click":function($event){_vm.closeTags(index)}}},[_c('i',{staticClass:"el-icon-close"})])],1)})),_vm._v(" "),_c('div',{staticClass:"tags-close-box"},[_c('el-dropdown',{on:{"command":_vm.handleTags}},[_c('el-button',{attrs:{"size":"mini","type":"primary"}},[_vm._v("\n                标签选项"),_c('i',{staticClass:"el-icon-arrow-down el-icon--right"})]),_vm._v(" "),_c('el-dropdown-menu',{attrs:{"slot":"dropdown","size":"small"},slot:"dropdown"},[_c('el-dropdown-item',{attrs:{"command":"other"}},[_vm._v("关闭其他")]),_vm._v(" "),_c('el-dropdown-item',{attrs:{"command":"all"}},[_vm._v("关闭所有")])],1)],1)],1)]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"header"},[_c('div',{staticClass:"collapse-btn",on:{"click":_vm.collapseChage}},[_c('i',{staticClass:"el-icon-menu"})]),_vm._v(" "),_c('div',{staticClass:"logo"},[_vm._v("后台管理系统")]),_vm._v(" "),_c('div',{staticClass:"header-right"},[_c('div',{staticClass:"header-user-con"},[_c('div',{staticClass:"btn-fullscreen",on:{"click":_vm.handleFullScreen}},[_c('el-tooltip',{attrs:{"effect":"dark","content":_vm.fullscreen?"取消全屏":"全屏","placement":"bottom"}},[_c('i',{staticClass:"el-icon-rank"})])],1),_vm._v(" "),_c('div',{staticClass:"btn-bell"},[_c('el-tooltip',{attrs:{"effect":"dark","content":_vm.message?("有" + _vm.message + "条未读消息"):"消息中心","placement":"bottom"}},[_c('router-link',{attrs:{"to":"/tabs"}},[_c('i',{staticClass:"el-icon-bell"})])],1),_vm._v(" "),(_vm.message)?_c('span',{staticClass:"btn-bell-badge"}):_vm._e()],1),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('el-dropdown',{staticClass:"user-name",attrs:{"trigger":"click"},on:{"command":_vm.handleCommand}},[_c('span',{staticClass:"el-dropdown-link"},[_vm._v("\n                    "+_vm._s(_vm.username)+" "),_c('i',{staticClass:"el-icon-caret-bottom"})]),_vm._v(" "),_c('el-dropdown-menu',{attrs:{"slot":"dropdown"},slot:"dropdown"},[_c('a',{attrs:{"href":"http://blog.gdfengshuo.com/about/","target":"_blank"}},[_c('el-dropdown-item',[_vm._v("关于作者")])],1),_vm._v(" "),_c('a',{attrs:{"href":"https://github.com/lin-xin/vue-manage-system","target":"_blank"}},[_c('el-dropdown-item',[_vm._v("项目仓库")])],1),_vm._v(" "),_c('el-dropdown-item',{attrs:{"divided":"","command":"loginout"}},[_vm._v("退出登录")])],1)],1)],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"user-avator"},[_c('img',{attrs:{"src":"static/img/img.jpg"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});