// initial state
const state = {
  // 所有地图对象
  maps: {},
}

// getters
const getters = {}

// mutations
const mutations = {
  maps(state, maps) {
    state.maps = maps;
  },
}

// actions
const actions = {
  async addMaps({ state }, val) {
    for (let key in val) {
      state.maps[key] = val[key];
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

