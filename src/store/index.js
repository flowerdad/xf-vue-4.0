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
    modules: window.localStorage.getItem("modules"),
    // 主题
    theme: window.localStorage.getItem("theme"),
    // 角色
    role: window.localStorage.getItem("role"),
    // cardPack显示隐藏
    cardPackZoom: false,
    // 是否是登录状态
    isLogin: false,
    // 动态渲染的按钮
    menuList: [],
    // 所有地图对象
    maps: {}
  },
  mutations: {
    LOGIN_IN(state, login) {
      state.isLogin = true;
      state.token = login.token;
      state.modules = login.modules;
      state.role = login.role;
      localStorage.token = login.token;
      localStorage.modules = login.modules;
      localStorage.role = login.role;
    },
    LOGIN_OUT(state) {
      state.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("modules");
      localStorage.removeItem("role");
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
    }
  },
  actions: {
    async initRouter({ state }, val) {
      let noeFound = [
        {
          path: "*",
          name: "404",
          component: () => import("@/views/error/404.vue"),
          nav: false
        }
      ];
      let arr = await api.router.getRouter(val);
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
