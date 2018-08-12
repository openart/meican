import apiAuth from "@/api/auth"
import { request } from '@/utils'
export default {
  data: function () {
    return {
      ruleForm: {
        username: "jasonzhang@lexinfintech.com",
        password: "meican123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码1", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        //this.$router.push("/");
        this.login()
      });
    },
    async login() {
      await request({
        func: apiAuth.login,
        params: {
          user: this.ruleForm.username,
          pwd: this.ruleForm.password
        }
      })
    }
  }
};