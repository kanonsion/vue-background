// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animated)
Vue.use(VueQuillEditor, /* { default global options } */)

/* Vue.prototype.$axios = axios
 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
