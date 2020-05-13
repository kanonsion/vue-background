import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import layout from "@/views/index/index.vue";

export const constantRouterMap = [
  {
    path: "/register",
    hiddle: true,
    component: () => import("@/views/User/Register.vue"),
  },
  {
    path: "/login",
    hiddle: true,
    component: () => import("@/views/User/login.vue"),
  },
];

export const asyncRouterMap = [
  {
    path: "/",
    redirect: "/chart/index",
    hiddle: true,
    roles: ["admin", "nor"],
  },
  {
    path: "/chart",
    component: layout,
    hiddle: false,
    always: true,
    roles: ["admin", "nor"],
    meta: {
      title: "首页",
      icon: "el-icon-pie-chart",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/chart"),
      },
    ],
  },
  /* 404 */
  {
    path: "*",
    hiddle: true,
    roles: ["admin", "nor"],
    component: () => import("@/views/404.vue"),
  },

  /* user */
  {
    path: "/user",
    redirect: "/user/list",
    component: layout,
    name: "user",
    hiddle: false,
    roles: ["admin"],
    meta: {
      title: "用户",
      icon: "el-icon-user",
    },
    children: [
      {
        path: "list",
        name: "list",
        component: () => import("@/views/User/userList.vue"),
        roles: ["admin"],
        meta: {
          title: "用户管理",
          icon: "el-icon-film            ",
        },
      },
    ],
  },

  /* aritice */
  {
    path: "/aritice",
    redirect: "/aritice/writearitice",
    component: layout,
    hiddle: false,
    name: "aritice",
    roles: ["admin", "nor"],
    meta: {
      title: "文章",
      icon: "el-icon-reading",
    },
    children: [
      {
        path: "writearitice",
        component: () => import("@/views/Article/writeAritice"),
        name: "writearitice",
        roles: ["admin", "nor"],
        meta: {
          title: "文章编写",
          icon: "el-icon-edit-outline",
        },
      },
      {
        path: "articleList",
        component: () => import("@/views/Article/ariticeList"),
        name: "articleList",
        roles: ["admin"],
        meta: {
          title: "文章管理",
          icon: "el-icon-document-checked ",
        },
      },
    ],
  },

  /* 标签 */
  {
    path: "/tags",
    redirect: "/tags/list",
    component: layout,
    hiddle: false,
    name: "tags",
    roles: ["admin"],
    meta: {
      title: "标签",
      icon: "el-icon-notebook-1",
    },
    children: [
      {
        path: "add",
        component: () => import("@/views/tags/add"),
        name: "add",
        roles: ["admin"],
        meta: {
          title: "新增标签",
          icon: "el-icon-position",
        },
      },
      {
        path: "list",
        component: () => import("@/views/tags/list"),
        name: "list",
        roles: ["admin"],
        meta: {
          title: "标签管理",
          icon: "el-icon-notebook-2",
        },
      },
    ],
  },

  /* 评论 */
  {
    path: "/comment",
    redirect: "/comment/list",
    component: layout,
    hiddle: false,
    name: "comment",
    roles: ["admin"],
    meta: {
      title: "评论",
      icon: "el-icon-chat-line-square      ",
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/comment"),
        name: "list",
        roles: ["admin"],
        meta: {
          title: "标签管理",
          icon: "el-icon-chat-square          ",
        },
      },
    ],
  },
];

const createRouter = () => {
  return new Router({
    mode: "history",
    routes: constantRouterMap,
  });
};

let router = createRouter();

export const resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; /* reset */
};

export default router;
