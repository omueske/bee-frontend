// import merge from 'vuex'
import axios from 'axios'

export const state = () => ({
  queenList: [],
  selectedQueen: ''
})

export const mutations = {
  LOAD_QUEENS(state, queens) {
    state.queenList = queens
  },
  ADD_QUEEN(state, queen) {
    state.queenList.push(queen)
  },
  REMOVE_QUEENS(state, { queen }) {
    state.hivesList.splice(state.hivesList.indexOf(queen), 1)
  },
  SET_SELECTED_QUEEN(state, queen) {
    state.selectedQueen = queen
  }
}

export const actions = {
  async addQueen({ commit }, params) {
    await this.$axios
      .post(this.$axios.defaults.baseURL + '/api/v1/queens', params)
      .then((res) => {
        if (res.status === 200) {
          commit('ADD_QUEEN', res.data)
          // commit('setHive', res.data)
        }
      })
  },
  async loadQueens({ commit }) {
    await this.$axios
      .get(this.$axios.defaults.baseURL + '/api/v1/queens')
      .then((res) => {
        if (res.status === 200) {
          commit('LOAD_QUEENS', res.data)
        }
      })
  },

  async setSelectedQueen({ commit }, params) {
    return await axios
      .get(this.$axios.defaults.baseURL + `/api/v1/queens/${params}`)
      .then((res) => {
        commit('setSelectedQueen', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  getQueenById: (state) => (id) => {
    return state.queenList.find((queenId) => queenId._id === id)
  }
}
