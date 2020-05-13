<template>
  <el-aside :width="asideWidth + 'px'">
    <el-menu
      background-color="#34495e"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="true"
      :unique-opened="true"
      @select="handleMenuSelect"
      router
      :default-active="active"
    >
      <template v-for="(item, index) in routers">
        <template v-if="item.always">
          <el-menu-item
            :index="item.path + '/' + item2.path"
            v-for="(item2, index2) in item.children"
            :key="index2"
            ><i :class="item.meta.icon"></i><span slot="title">{{ item.meta.title }}</span></el-menu-item
          >
        </template>
        <el-submenu :index="item.path" :key="index" v-else>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            :index="item.path + '/' + item2.path"
            v-for="(item2, index2) in item.children"
            :key="index2"
            ><i :class="item2.meta.icon"></i
            >{{ item2.meta.title }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      active: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuSelect(index, indexPath) {
      console.log(index);
      console.log(indexPath);
    },
  },
  props: {
    asideWidth: {
      type: Number,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  computed: {
    routers() {
      console.log(this.$store.state.permisson.routes);
      return this.$store.state.permisson.routes.filter((item) => {
        return item.hiddle === false;
      });
    },
  },
  created() {
    this.active = this.$route.path;
  },
  watch: {
    $route(val) {
      this.active = val.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #34495e;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  .el-menu {
    border: none;
  }
}
</style>
