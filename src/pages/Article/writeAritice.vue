<template>
  <el-main>
    <breadcrumb/>
    <quillEditer/>
  </el-main> 
</template>

<script>
import quillEditer from 'components/quillEditer'
import breadcrumb from "components/breadcrumb.vue";
export default {
  components:{
    quillEditer,
    breadcrumb
  }
}
</script>

<style lang="stylus">

</style>
