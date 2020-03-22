import Vue from 'vue'
import Vuex from 'vuex'
import sys from './modules/sys.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sys
  }

})

export default store
