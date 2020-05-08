<template>
  <el-main>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-main {
  width: 100%;
  overflow: hidden;
}
</style>
