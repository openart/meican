export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        },       {
          title: "今天要写100行代码加几个bug吧",
          status: true
        },       {
          title: "今天要写100行代码加几个bug吧",
          status: true
        },       {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ]
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  }
};