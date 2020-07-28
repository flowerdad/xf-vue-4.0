import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import api from "./request/api";

// element
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/elementui-variables.scss";
import "./assets/styles/common.scss";
Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.config.productionTip = false;

// echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 全局组件
import modules from "@/assets/js/modules";
console.log(modules)
Vue.use(modules.plugin);
Vue.prototype.vModules = modules.modules;

// js全局公用方法
import vMap from "@/assets/js/vMap";
Vue.prototype.vMap = vMap;
import config from "@/assets/js/config";
Vue.prototype.config = config;
import vTools from "@/assets/js/tools";
Vue.prototype.vTools = vTools;
import vEcharts from "@/assets/js/vEcharts";
Vue.prototype.vEcharts = vEcharts;

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

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
