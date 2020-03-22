import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import store from './store'
import axios from './common/hosts/http-interceptor.js'


Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
	el: '#app',
  store,
  router,
  render: h => h(App)
})
