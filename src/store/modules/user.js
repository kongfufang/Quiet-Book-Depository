export default {
  namespaced: true,
  state () {
    return {
      Code: '1',
      token: ''
    }
  },
  mutations: {
    setCode (state, payload) {
      state.Code = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  }
}
