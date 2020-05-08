import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";

import "@/styles/index.scss";

import "element-ui/lib/theme-chalk/index.css";
import ele from "element-ui";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import "./permisson";
import VueParticles from "vue-particles";
import VCharts from "v-charts";
// use

Vue.config.productionTip = false;
Vue.use(ele)
  .use(mavonEditor)
  .use(VueParticles)
  .use(VCharts);
new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
