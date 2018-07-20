/**
 * 接口异常错误码处理
 */
module.exports = {
    systemError: {
        result: 1000,
        result_info: '系统异常'
    },
    loginFail: {
        result: 1001,
        result_info: '登录失败'
    },
    noInOrderTime: {
        result: 1002,
        result_info: '抱歉，当前时间点不可点餐'
    },
    orderFail: {
        result: 1003,
        result_info: '点餐失败'
    },
    loginReSubmit: {
        result: 1004,
        result_info: '你已登入，无需重复提交'
    },

}
