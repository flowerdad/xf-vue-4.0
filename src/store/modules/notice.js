// initial state
const state = {
  // 左侧内容载体显示隐藏
  cardPackLeft: false,
  // 右侧内容载体显示隐藏
  cardPackRight: false,
  // 地图工具箱显示隐藏
  mapPack: false,
  // 左侧工具箱显示隐藏
  toolPackLeft: false,
  // 右侧工具箱显示隐藏
  toolPackRight: false,
  // 左侧工具箱module
  toolLeftModule: [],
  // 右边工具箱module
  toolRightModule: [],
  // 处理拖拽模块丢失的bug
  isdraggableEnd: false
}

// getters
const getters = {}

// mutations
const mutations = {
  cardPackLeft(state, cardPackLeft) {
    state.cardPackLeft = cardPackLeft;
  },
  cardPackRight(state, cardPackRight) {
    state.cardPackRight = cardPackRight;
  },
  mapPack(state, mapPack) {
    state.mapPack = mapPack;
  },
  toolPackLeft(state, toolPackLeft) {
    state.toolPackLeft = toolPackLeft;
  },
  toolPackRight(state, toolPackRight) {
    state.toolPackRight = toolPackRight;
  },
  toolLeftModule(state, toolLeftModule) {
    state.toolLeftModule = toolLeftModule;
  },
  toolRightModule(state, toolRightModule) {
    state.toolRightModule = toolRightModule;
  },
  isdraggableEnd(state, data) {
    state.isdraggableEnd = data;
  }
}

// actions
const actions = {
  // toolLeftModule({ state }, val) {
  //   state.toolLeftModule = val;
  // },
  // toolRightModule({ state }, val) {
  //   state.toolRightModule = val;
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}

