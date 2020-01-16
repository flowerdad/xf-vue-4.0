import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// import vuex from '../store'

// 静态路由
const routes = [
  {
    path: "/",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register/Register.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/Home.vue")
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

// let whiteList = routes.map(i => i.path)
// router.beforeEach((to, from, next) => {
//   let path = to.redirectedFrom || to.path
//   // 白名单 放行
//   if (whiteList.indexOf(path) >= 0) return next()
//   // 黑名单
//   if (!vuex.getters.roleRouter) return next({ path: '/login' })

//   if (!vuex.getters.isAddRoutes) {
//     console.log(vuex.getters.roleRouter)
//     console.log('path未注册,存在角色路由，立即注册尝试匹配')
//     router.addRoutes(vuex.getters.roleRouter)
//     vuex.dispatch('set_isAddRoutes', true)
//     next(path)
//   } else {
//     console.log('已注册过动态路由，尝试匹配')
//     next()
//   }
// })
