<template>
  <div>
    <div v-html="list[3]"></div>
  </div>
</template>

<script>
import { aritices } from "api/account";
export default {
  data() {
    return {
      list:[]
    }
  },
  methods: {
    async _aritices(){
      let res = await aritices()
      this.list = res.data      
    }
  },
  created() {
    this._aritices()
  },
}
</script>

<style lang="stylus">

</style>
