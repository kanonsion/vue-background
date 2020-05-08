<template>
  <el-container style="height: 100%;width:100%;">
    <myaside :asideWidth="asideWidth" :isCollapse="isCollapse" />
    <el-container
      direction="vertical"
      :style="{ marginLeft: asideWidth + 'px' }"
    >
      <myheader @isCollapse="handleCollapse" />
      <mymain />
    </el-container>
  </el-container>
</template>

<script>
/* import { mapActions, mapState } from "vuex"; */
import myheader from "./children/head";
import myaside from "./children/aside";
import mymain from "./children/home";
export default {
  components: {
    myheader,
    mymain,
    myaside,
  },
  data() {
    return {
      isCollapse: false,
      asideWidth: 200,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCollapse(data) {
      if (data) {
        this.asideWidth = 65;
      } else {
        this.asideWidth = 200;
      }
      this.isCollapse = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
