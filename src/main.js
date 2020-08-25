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

// 全局配置
import vConfig from "@/assets/js/vConfig";
Vue.prototype.vConfig = vConfig;

// 全局组件
import vModules from "@/assets/js/vModules";
Vue.use(vModules.plugin);

// 地图
import vMap from "@/assets/js/vMap";
Vue.prototype.vMap = vMap;

// 全局工具类
import vTools from "@/assets/js/vTools";
Vue.prototype.vTools = vTools;

// 自封装echarts
import vEcharts from "@/assets/js/vEcharts";
Vue.prototype.vEcharts = vEcharts;

// 判断是否有token，是否重组路由
if (localStorage.getItem("token") != undefined) {
  store.commit("login_in", {
    token: localStorage.getItem("token"),
    config: localStorage.getItem("config"),
    theme: localStorage.getItem("theme")
  });
  store.dispatch("initRouter", JSON.parse(localStorage.getItem("config")));
}

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
