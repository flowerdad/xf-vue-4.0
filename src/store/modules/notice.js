// initial state
const state = {
  // 左侧内容载体显示隐藏
  cardPackLeft: true,
  // 右侧内容载体显示隐藏
  cardPackRight: true,
  // 地图工具箱显示隐藏
  mapPack: false,
  // 左侧工具箱显示隐藏
  toolPackLeft: false,
  // 右侧工具箱显示隐藏
  toolPackRight: false,
  // 工具栏编辑
  toolEdit: false,
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
  cardPackLeft(state, data) {
    state.cardPackLeft = data;
  },
  cardPackRight(state, data) {
    state.cardPackRight = data;
  },
  mapPack(state, data) {
    state.mapPack = data;
  },
  toolPackLeft(state, data) {
    state.toolPackLeft = data;
  },
  toolPackRight(state, data) {
    state.toolPackRight = data;
  },
  toolEdit(state, data) {
    state.toolEdit = data;
  },
  toolLeftModule(state, data) {
    state.toolLeftModule = data;
  },
  toolRightModule(state, data) {
    state.toolRightModule = data;
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

