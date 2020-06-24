import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

// 静态路由
const routes = [
  {
    path: "/",
    component: () => import("../views/login/Login.vue"),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register/Register.vue"),
    meta: {
      keepAlive: false
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

// 路由守卫，是否登录
router.beforeEach((to, from, next) => {
  if (store.state.isLogin && store.state.token != null) {
    next();
  } else {
    console.log(to.path);
    if (to.path != "/") {
      next({ path: "/" });
    } else {
      next();
    }
  }
});
