import { asyncRouterMap } from "@/router";

const state = {
  routes: []
};

const actions = {
  setRoutes({ commit }, role) {
    return new Promise(resolve => {
      let addroutes = [];
      if (role.includes("admin")) {
        addroutes = asyncRouterMap;
      } else {
        addroutes = filterRoutes(asyncRouterMap, role);
        console.log(addroutes);
      }
      commit("SET-ROUTES", addroutes);
      resolve(addroutes);
    });
  }
};

const mutations = {
  "SET-ROUTES"(state, routes) {
    state.routes = routes;
  }
};

function filterRoutes(arr, role) {
  let tmp = [];
  console.log(arr);
  for (const item of arr) {
    if (hasRole(item, role)) {
      if (item.children) {
        item.children = filterRoutes(item.children, role);
      }
      tmp.push(item);
    }
  }
  return tmp;
}

function hasRole(arr, role) {
  if (arr.roles) {
    return arr.roles.includes(role);
  } else {
    return true;
  }
}

export default {
  state,
  actions,
  mutations
};
