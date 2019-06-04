<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breads" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    show() {
      this.collapse = !this.collapse;
      this.$emit("isCollapse", this.collapse);
    }
  },
  computed: {
    breads(){
      return this.$route.matched
    }
  },
};
</script>

<style lang="stylus">
.breadcrumb
  margin-bottom 10px
</style>
