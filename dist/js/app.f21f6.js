webpackJsonp([6],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_lazy_image__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_lazy_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_lazy_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router_index__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_element_ui__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return __WEBPACK_IMPORTED_MODULE_5__router_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return __WEBPACK_IMPORTED_MODULE_4__store__["a"]; });











__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_8_element_ui___default.a, { size: 'small' });

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_lazy_image___default.a);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__router_index__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.debug = true;

//使用钩子函数对路由进行权限跳转
__WEBPACK_IMPORTED_MODULE_5__router_index__["a" /* default */].beforeEach((to, from, next) => {
  // 登录判断
  if (to.matched.some(record => record.meta.login)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils__["a" /* request */])({
      func: __WEBPACK_IMPORTED_MODULE_6__api_auth__["a" /* default */].isLogin
    }).then(res => {
      if (res.login !== 1) return false;
      next();
    });
  } else {
    next();
  }
});

const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  name: 'zhihu',
  router: __WEBPACK_IMPORTED_MODULE_5__router_index__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */],
  render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_3__App__["a" /* default */]);
  }
});



/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _this = this;

/**
 * 请求封装
 * @param {Object} options
 * @param {Function} repayData.queryFun 查询函数 必须
 * @param {Object} repayData.params 查询入参 非必须
 */
/* harmony default export */ __webpack_exports__["a"] = (async options => {
  if (!options.func) {
    throw new Error('options.queryFun is required');
  }
  let ret;
  // 请求异常判断
  try {
    ret = await options.func.call(_this, {
      params: options.params
    } || {});
  } catch (error) {
    ret = {};
    throw error;
  }
  // 数据异常判断
  if (ret.data && Number(ret.data.result) === 0) {
    return ret.data.result_rows;
  } else {}
  return false;
});

/***/ }),

/***/ 179:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reqest__ = __webpack_require__(126);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__reqest__["a"]; });



/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'zhihu'
});

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http__ = __webpack_require__(83);


/* harmony default export */ __webpack_exports__["a"] = ({
  /**
  * 登录鉴权
  * @wiki
  * @param {any} data 入参
  * @returns
  */
  isLogin(data) {
    let url = '/auth/isLogin';
    return __WEBPACK_IMPORTED_MODULE_0__http__["a" /* default */].get(url, data);
  },
  /**
   * 登录
   * @param {Object} 用户名密码 
   */
  login(data) {
    let url = '/auth/login';
    return __WEBPACK_IMPORTED_MODULE_0__http__["a" /* default */].get(url, data);
  }
});

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(189);


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    redirect: '/order-reverse'
  }, {
    path: '/',
    component: resolve => __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(194)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
    meta: { title: '自述文件' },
    children: [{
      path: '/home',
      component: resolve => __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(195)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
      meta: { title: '首页' }
    }, {
      path: 'order-reverse',
      component: resolve => __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(197)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
      meta: {
        title: '订单预约',
        login: true
      }
    }, {
      path: 'my-reverse',
      component: resolve => __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(198)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
      meta: {
        title: '我的预约',
        login: false
      }
    }]
  }, {
    path: '/login',
    component: resolve => __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(196)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
    meta: {
      title: '登录',
      login: false
    }
  }]
}));

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(191);


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  state: {},
  actions: {}
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(54);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09cddf9a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(188);
function injectStyle (ssrContext) {
  __webpack_require__(179)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09cddf9a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui__);




__WEBPACK_IMPORTED_MODULE_1_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_element_ui___default.a, { size: 'small' });

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
  timeout: 8000,
  baseURL: 'http://localhost:5502/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformResponse: [function (res) {
    // 对 data 进行转换处理
    res = typeof res === 'string' ? JSON.parse(res) : res;
    return res;
  }]
}));

/***/ })

},[125]);