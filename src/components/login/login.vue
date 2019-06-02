<template>
  <div class="loginBox">
    <el-form
      label-position="top"
      :rules="rules"
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3>用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="mybtn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // console.log('成功')
          //发送请求
          this.$http.post("/login", this.ruleForm).then(res => {
            // console.log(res.data)
            let { data, meta } = res.data;
            if (meta.status === 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              localStorage.setItem('token',data.token)  //本地存令牌
              this.$router.push('/home')
            } else if (meta.status === 400) {
              this.$message({
                message: meta.msg,
                type: "warning"
              });
            }
          });
        } else {
          this.$message.error("请输入用户名/密码");
        }
      });
    }
  }
};
</script>

<style scoped>
.loginBox {
  width: 600px;
  padding: 50px;
  border-radius: 15px;
  position: absolute;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.mybtn {
  width: 100%;
}
</style>
