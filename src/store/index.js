import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHORZATED: 'authorizated',
  SET_USER: 'user',
  CLEAR_AUTHORZATED: 'clearAuthorizated',
  CLEAR_USER: 'clearUser',
}
const actions = {
  authorizated({ commit }, isAuthorizated) {
    commit(types.SET_AUTHORZATED, isAuthorizated)
  },
  user({ commit }, user) {
    commit(types.SET_USER, user)
  },
  clearAuthorizated({ commit }, isAuthorizated) {
    commit(types.CLEAR_AUTHORZATED, isAuthorizated)
  },
  clearUser({ commit }, user) {
    commit(types.CLEAR_USER, user)
  },
}
const mutations = {
  [types.SET_AUTHORZATED](state, isAuthorizated) {
    if (isAuthorizated) {
      state.isAuthorizated = isAuthorizated
    } else {
      state.isAuthorizated = false
    }
  },
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  },
  [types.CLEAR_AUTHORZATED](state, isAuthorizated) {
    state.isAuthorizated = isAuthorizated
  },
  [types.CLEAR_USER](state, user) {
    state.user = user
  },
}
const state = {
  isAuthorizated: false,
  user: {},
}
const getters = {
  isAuthorizated: state => state.isAuthorizated,
  user: state => state.user
}


const store = new Vuex.Store({
  actions,
  mutations,
  state,
  types,
  getters
})

export default store