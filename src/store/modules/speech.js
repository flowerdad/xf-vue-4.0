// initial state
const state = {
  themeRed: false,
  themeblue: false,
  themeGreen: false
}

// getters
const getters = {}

// mutations
const mutations = {
  themeRed(state, data) {
    state.themeRed = data;
  },
  themeblue(state, data) {
    state.themeblue = data;
  },
  themeGreen(state, data) {
    state.themeGreen = data;
  },
}

// actions
const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}

