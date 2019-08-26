<template>
  <el-aside :width="asideWidth+'px'">
    <el-menu
      background-color="#34495e"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="true"
      :unique-opened="true"
      @select="handleMenuSelect"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="用户管理" @click="handlelist('/index/userList')">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="文章编写" @click="handlelist('/index/writearitice')">文章编写</el-menu-item>
        <el-menu-item index="文章管理" @click="handlelist('/index/articleList')">文章管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handlelist(site) {
      this.$router.push(`${site}`);
    },
    handleMenuSelect(index, indexPath) {
    }
  },
  props: {
    asideWidth: {
      type: Number
    },
    isCollapse: {
      type: Boolean
    }
  }
};
</script>

<style lang="stylus">
.el-aside
  background-color #34495e
  height 100%
  .el-menu
    border none
</style>
