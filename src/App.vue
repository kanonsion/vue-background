<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "String" && value.trim().length === 0)
      );
    }
  },
  created() {
    if (localStorage.eletoken) {
      const user = jwt_decode(localStorage.eletoken);
      this.$store.dispatch("authorizated", !this.isEmpty(user));
      this.$store.dispatch("user", user);
    }
  }
};
</script>

<style lang="stylus">
@import url('./../public/css/reset.styl')
#app
  width 100%
  height 100%
</style>

