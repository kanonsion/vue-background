<template>
  <div class="register">
    <bg/>
    <div class="from">
      <el-form :model="register" :rules="rules" ref="register" status-icon>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="register.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="register.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="register.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="register.repassword" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="操作人" prop="identity">
          <el-select v-model="register.identity">
            <el-option label="管理员" value="管理员" placeholder="请选择活动区域"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('register')">注册</el-button>
          <el-button @click="resetForm('register')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bg from 'components/bg.vue'
import { register } from "api/account";
import { Message } from "element-ui";
export default {
  data() {
    var validatorName = (rule, value, callback) => {
      if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error("用户名包含非法字符"));
      } else {
        callback();
      }
    };
    var validateRepwd = (rule, value, callback) => {
      if (value != this.register.password) {
        callback(new Error("两次密码输入不正确"));
      } else {
        callback();
      }
    };
    return {
      register: {
        name: "",
        email: "",
        password: "",
        repassword: "",
        identity: ""
      },
      rules: {
        name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: validatorName, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateRepwd, trigger: "blur" }
        ],
        identity: [
          { required: true, message: "请选择操作人", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this._register();
        }
      });
    },
    resetForm(formname) {
      this.$refs[formname].resetFields();
    },
    async _register() {
      try {
        let res = await register(this.register);
        this.$message({
          message: "注册成功",
          type: "success"
        })
        this.$router.replace('/login')
      } catch (error) {
        this.$message({
          message: "错误",
          type: "error"
        })
      }
    }
  },
  components:{
    bg
  }
};
</script>

<style lang="stylus">
.register
  height 100vh
  display flex
  justify-content center
  align-items center
  position relative
  overflow hidden
  .from
    background rgba(230, 238, 232, 0.5)
    box-shadow 0px 0px 8px black
    display flex
    justify-content center
    align-items center
    padding 10px 50px
    border-radius 4px
    min-height 20px
    transition 0.4s all
  .from:hover
    box-shadow 0px 0px 16px black
</style>
