import Vue from "vue";
import Vuex from "vuex";

import permissions from './modules/permissions'
import map from './modules/map'
import notice from './modules/notice'

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    permissions,
    map,
    notice
  }
  // plugins: debug ? [createLogger()] : []
})
