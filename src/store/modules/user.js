import jwtDecode from "jwt-decode";
import { resetRouter } from "@/router";

const actions = {
  user({ commit }, user) {
    commit("SET_USER", user);
  },
  role({ commit }, token) {
    return new Promise(resolve => {
      const role = jwtDecode(token).identity;
      console.log(role);
      commit("SET_ROLE", role);
      resolve(role);
    });
  },
  clearUser({ commit }, user) {
    sessionStorage.removeItem("token");
    resetRouter();
    commit("CLEAR_USER", user);
  }
};
const mutations = {
  SET_USER(state, user) {
    if (user) {
      state.user = user;
    } else {
      state.user = "";
    }
  },
  CLEAR_USER(state) {
    state.user = "";
    state.role = "";
  },
  SET_ROLE(state, role) {
    state.role = role;
  }
};
const state = {
  user: "",
  role: ""
};

const getters = {
  user: state => state.user
};

export default {
  actions,
  mutations,
  state,
  getters
};
