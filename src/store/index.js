import Vue from "vue";
import Vuex from "vuex";
// import { getMenu } from "../api/api";
import router from "../router/index";
import api from "../request/api";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // token
    token: window.localStorage.getItem("token"),
    // 全局权限控制
    config: window.localStorage.getItem("config"),
    // 主题
    theme: window.localStorage.getItem("theme"),
    // cardPack显示隐藏
    cardPackZoom: false,
    // 是否是登录状态
    isLogin: false,
    // 动态渲染的按钮
    menuList: [],
    // 所有地图对象
    maps: {},
    // 处理拖拽模块丢失的bug
    isdraggableEnd: false
  },
  mutations: {
    LOGIN_IN(state, login) {
      state.isLogin = true;
      state.token = login.token;
      state.config = login.config;
      state.theme = login.theme;
      localStorage.token = login.token;
      localStorage.config = login.config;
      localStorage.theme = login.theme;
    },
    LOGIN_OUT(state) {
      state.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("config");
      state.menuList = [];
      // 刷新，清空动态添加的路由
      location.reload();
    },
    theme(state, theme) {
      state.theme = theme;
      localStorage.theme = theme;
    },
    cardPackZoom(state, cardPackZoom) {
      state.cardPackZoom = cardPackZoom;
    },
    maps(state, maps) {
      state.maps = maps;
    },
    isdraggableEnd(state, data) {
      state.isdraggableEnd = data;
    }
  },
  actions: {
    initRouter({ state }, val) {
      let noeFound = [
        {
          path: "*",
          name: "404",
          component: () => import("@/views/error/404.vue"),
          nav: false
        }
      ];
      let arr = api.router.getRouter(val);
      state.menuList = arr.concat(noeFound);
      router.addRoutes(state.menuList);
    },
    async addMaps({ state }, val) {
      for (let key in val) {
        state.maps[key] = val[key];
      }
    }
  }
});

export default store;
