<template>
  <div class="register">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="particles"
    >
    </vue-particles>
    <div class="from">
      <el-form :model="login" :rules="rules" ref="login" status-icon>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="login.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="login.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('login')"
            >登录</el-button
          >
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/account";
export default {
  data() {
    var validatorName = (rule, value, callback) => {
      if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error("用户名包含非法字符"));
      } else {
        callback();
      }
    };
    return {
      login: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: validatorName, trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this._login();
        }
      });
    },
    resetForm(formname) {
      this.$refs[formname].resetFields();
    },
    async _login() {
      let res = await login(this.login);
      //本地存储token
      sessionStorage.token = res.token;
      if (res.status) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.$router.push("/");
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
  created() {
    this.$notify({
      title: "登录注意",
      dangerouslyUseHTMLString: true,
      message: "<div>账号:&nbsp;admin</div><div>密码:&nbsp;admin</div>",
    });
  },
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: url("~@/assets/bgs/bg.png") no-repeat;
  background-position-x: -300px;
  background-position-y: -200px;
  .from {
    background: rgba(230, 238, 232, 0.5);
    box-shadow: 0px 0px 8px black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 50px;
    border-radius: 4px;
    min-height: 20px;
    transition: 0.4s all;
  }
  .from:hover {
    box-shadow: 0px 0px 16px black;
  }
  .particles {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
