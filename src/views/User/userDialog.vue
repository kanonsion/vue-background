<template>
  <div>
    <el-dialog :visible.sync="dialog.show" :title="dialog.title" width="500px">
      <el-form
        :model="form"
        :rules="dialog.add ? rules1 : rules2"
        ref="dialog"
        status-icon
      >
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入用户名">{{
            dialog.row
          }}</el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
          v-if="dialog.add"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="repassword"
          :label-width="formLabelWidth"
          v-if="dialog.add"
        >
          <el-input
            v-model="form.repassword"
            type="password"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="操作人"
          prop="identity"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.identity">
            <el-option
              label="管理员"
              value="管理员"
              placeholder="请选择活动区域"
            ></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('dialog')">取 消</el-button>
        <el-button type="primary" @click="addForm('dialog')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { register, updateUser } from "@/api/account";
/* import { Message } from "element-ui"; */
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
      if (value != this.form.password) {
        callback(new Error("两次密码输入不正确"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules1: {
        name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: validatorName, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateRepwd, trigger: "blur" },
        ],
        identity: [
          { required: true, message: "请选择操作人", trigger: "change" },
        ],
      },
      rules2: {
        name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: validatorName, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        identity: [
          { required: true, message: "请选择操作人", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    resetForm(formname) {
      this.$refs[formname].resetFields();
      setTimeout(() => {
        this.dialog.show = false;
      }, 0);
    },
    addForm(formname) {
      console.log(this.form);
      this.$refs[formname].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (formname === "add") {
            this._register();
          } else if (formname === "edit") {
            this._updateUser();
          }
        }
        this.$emit("updatePage");
        setTimeout(() => {
          this.dialog.show = false;
        }, 0);
      });
    },
    async _register() {
      try {
        await register(this.form);
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "错误",
          type: "error",
        });
      }
    },
    async _updateUser() {
      try {
        await updateUser(this.dialog.id, this.form);
        this.$message({
          message: "更新成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "错误",
          type: "error",
        });
      }
    },
    handleClose() {
      this.$emit("close");
      this.$refs["dialog"].resetFields();
    },
  },
  props: {
    dialog: {
      type: Object,
    },
    form: {
      type: Object,
    },
  },
};
</script>
