// initial state
const state = {
  // cardPack显示隐藏
  cardPackZoom: false,
  // 处理拖拽模块丢失的bug
  isdraggableEnd: false
}

// getters
const getters = {}

// mutations
const mutations = {
  cardPackZoom(state, cardPackZoom) {
    state.cardPackZoom = cardPackZoom;
  },
  isdraggableEnd(state, data) {
    state.isdraggableEnd = data;
  }
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

