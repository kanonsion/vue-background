<template>
  <el-main>
    <breadcrumb/>
  </el-main>
</template>

<script>
import breadcrumb from "components/breadcrumb.vue";
export default {
  components:{
    breadcrumb
  }
};
</script>

<style lang="stylus">
.el-main
  width 100%
</style>
