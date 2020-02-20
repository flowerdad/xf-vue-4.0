import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import api from "./request/api";
// import vueRouter from "vue-router";
// Vue.use(vueRouter);
// element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "./assets/styles/elementui-variables.scss";

Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.config.productionTip = false;

// js全局公用方法
import jurisdiction from "@/assets/js/jurisdiction";
Vue.prototype.jurisdiction = jurisdiction;
// 判断是否有token，是否重组路由
if (localStorage.getItem("token")) {
  store.commit("LOGIN_IN", localStorage.getItem("token"));
  store.dispatch("initRouter", "role1");
}

// 路由守卫，是否登录
// router.beforeEach((to, from, next) => {
//   if (store.state.isLogin && store.state.token) {
//     next();
//   } else {
//     // store.state.menuList = [];
//     if (to.path != "/") {
//       next({ path: "/" });
//     } else {
//       // next({ path: "/" });
//     }
//   }
// });

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
