import * as types from '@/common/types/mutation.js'
// initial state
const state = {
  isLogin : false,
  token: ''
}

// getters
const getters = {
  isLogin: state => state.isLogin
}

// actions
const actions = {
  setLoginStatus(state) {

  }
}

// mutations
const mutations = {
  [types.LOGOUT](state) {
    state.isLogin = false;
  },
  [types.LOGIN](state) {
    state.isLogin = true;
  },
  [types.PUT_TOKEN] (state, tockenData) {
    state.token = tockenData
  },
  [types.CLEAR_TOKEN](state,tockenData) {
    state.token = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
