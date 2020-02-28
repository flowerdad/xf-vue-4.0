import Vue from "vue";
import Vuex from "vuex";
// import { getMenu } from "../api/api";
import routerApp from "../router/index";
import api from "../request/api";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: window.localStorage.getItem("token"),
    modules: window.localStorage.getItem("modules"),
    // 主题
    theme: window.localStorage.getItem("modules"),
    // cardPack显示隐藏
    cardPackZoom: false,
    isLogin: false,
    menuList: []
  },
  mutations: {
    LOGIN_IN(state, token) {
      state.isLogin = true;
      localStorage.token = token;
    },
    MODULES_IN(state, modules) {
      localStorage.modules = modules;
    },
    LOGIN_OUT(state) {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    theme(state, theme) {
      state.theme = theme;
      localStorage.theme = theme;
    },
    cardPackZoom(state, cardPackZoom) {
      state.cardPackZoom = cardPackZoom;
    }
  },
  actions: {
    async initRouter({ state }, val) {
      let noeFound = [
        {
          path: "*",
          name: "404",
          component: () => import("@/views/error/404.vue"),
          hidden: false
        }
      ];
      let arr = await api.router.getRouter(val);
      state.menuList = arr.concat(noeFound);
      console.log(state.menuList);
      routerApp.addRoutes(state.menuList);
    }
  }
});

export default store;
