<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="标签">
        <el-input v-model="form.tag" placeholder="请输入标签"></el-input>
      </el-form-item>
      <el-form-item label="标签颜色">
        <el-color-picker v-model="form.tagColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="_add">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { tagAdd } from "@/api/tags";
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    async _add() {
      let res = await tagAdd(this.form);
      this.form = "";
      this.$message({
        message: res.msg,
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
