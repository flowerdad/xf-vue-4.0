import router from "@/router/index";
import api from "@/request/api";
// initial state
const state = {
  // token
  token: window.localStorage.getItem("token"),
  // 是否是登录状态
  isLogin: false,
  // 全局权限控制
  config: window.localStorage.getItem("config"),
  // 主题
  theme: window.localStorage.getItem("theme"),
  // 动态渲染的按钮
  menuList: [],
  // 工具栏配置
  toolsConfig: []
}

// getters
const getters = {}

// mutations
const mutations = {
  login_in(state, login) {
    state.isLogin = true;
    state.token = login.token;
    state.config = login.config;
    state.theme = login.theme;
    localStorage.token = login.token;
    localStorage.config = login.config;
    localStorage.theme = login.theme;
  },
  login_out(state) {
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
  toolsConfig(state, data) {
    state.toolsConfig = data;
  }
}

// actions
const actions = {
  initRouter({ state }, val) {
    let noeFound = [
      {
        path: "*",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        nav: false
      }
    ];
    console.log(val)
    let arr = api.router.getRouter(val.projectConfig);
    state.menuList = arr.concat(noeFound);
    router.addRoutes(state.menuList);
    state.toolsConfig = val.toolsConfig;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

