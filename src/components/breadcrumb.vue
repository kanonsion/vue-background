<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breads" :key="item.path">
          <span v-if="index == breads.length - 1" class="no-redirect">{{
            item.meta.title 
          }}</span>
          <span v-else @click="handleLink(item)" class="link">{{
            item.meta.title
          }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    show() {
      this.collapse = !this.collapse;
      this.$emit("isCollapse", this.collapse);
    },
    handleLink(item) {
      if (this.$route.path === item.redirect) return;
      this.$router.push(item.redirect);
    },
  },
  computed: {
    breads() {
      console.log(this.$route.matched)
      if (this.$route.matched[0].path === "/chart")
        return [this.$route.matched[0]];
      return this.$route.matched;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
}
.link {
  cursor: pointer;
}
.no-redirect {
  color: #999;
}
</style>
