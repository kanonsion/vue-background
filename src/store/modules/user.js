import jwtDecode from "jwt-decode";
import {resetRouter} from "@/router";

const actions = {
  setUser({commit}, token) {
    let user = jwtDecode(token);
    commit("SET_USER", user);
  },
  role({commit}, token) {
    return new Promise((resolve) => {
      const role = jwtDecode(token).identity;
      commit("SET_ROLE", role);
      resolve(role);
    });
  },
  clearUser({commit}, user) {
    sessionStorage.removeItem("token");
    resetRouter();
    commit("CLEAR_USER", user);
  },
};
const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = "";
    state.role = "";
  },
  SET_ROLE(state, role) {
    state.role = role;
  },
};
const state = {
  user: "",
  role: "",
};

const getters = {
  user: (state) => state.user,
};

export default {
  actions,
  mutations,
  state,
  getters,
};
