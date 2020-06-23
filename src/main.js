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
// import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/elementui-variables.scss";
import "./assets/styles/common.scss";
Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.config.productionTip = false;

// js全局公用方法
import jurisdiction from "@/assets/js/jurisdiction";
Vue.prototype.jurisdiction = jurisdiction;
import vMap from "@/assets/js/vMap";
Vue.prototype.vMap = vMap;
import config from "@/assets/js/config";
Vue.prototype.config = config;
import vTools from "@/assets/js/tools";
Vue.prototype.vTools = vTools;

// 判断是否有token，是否重组路由
if (localStorage.getItem("token") != undefined) {
  // alert(localStorage.getItem("token"));
  store.commit("LOGIN_IN", {
    token: localStorage.getItem("token"),
    modules: localStorage.getItem("modules"),
    role: localStorage.getItem("role")
  });
  store.dispatch("initRouter", localStorage.getItem("role"));
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
