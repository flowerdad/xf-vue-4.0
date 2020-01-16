import Vue from "vue";
import Vuex from "vuex";
// import { getMenu } from "../api/api";
// import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: window.localStorage.getItem("username"),
    token: window.localStorage.getItem("token"),
    isLogin: false,
    menuList: []
  },
  mutations: {
    LOGIN_IN(state, token) {
      state.isLogin = true;
      localStorage.token = token;
      state.UserToken = token;
    },
    LOGIN_OUT(state) {
      state.isLogin = false;
      state.UserToken = "";
      localStorage.removeItem("token");
    }
  },
  actions: {
    // async setMenuList({ commit, state }) {
    //   let noeFound = [
    //     {
    //       path: "*",
    //       name: "404",
    //       component: resolve => require(["../views/error/404.vue"], resolve),
    //       hidden: true
    //     }
    //   ];
    //   // let arr = await getMenu();
    //   let arr = {};
    //   state.menuList = arr.concat(noeFound);
    //   router.addRoutes(state.menuList);
    // }
  }
});

export default store;
