import Vue from 'vue'
import Router from 'vue-router'
import Register from 'pages/User/Register.vue'
import Login from 'pages/User/login.vue'
import Index from 'pages/index/index.vue'
import notfound from 'pages/404.vue'

import home from 'pages/index/children/home.vue'

import userList from 'pages/User/userList.vue'

import writeAritice from 'pages/Article/writeAritice'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      name: '首页',
      children: [
        {
          path: 'userList',
          component: userList,
          name: '用户管理'
        },
        {
          path: 'home',
          component: home
        },
        {
          path: 'writearitice',
          component: writeAritice,
          name: '文章编写',
        },
      ]
    },
    {
      path: '*',
      component: notfound
    },
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.eletoken ? true : false
  if (token || to.path === '/login' || to.path === '/register') {
    next()
  } else {
    next('/login')
  }
})

export default router
