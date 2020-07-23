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
  REMOVE_QUEEN(state, { queen }) {
    state.queenList.splice(state.queenList.indexOf(queen), 1)
  },
  SET_SELECTED_QUEEN(state, queen) {
    state.selectedQueen = queen
  },
  UPDATE_QUEEN(state, queen) {
    const newQueen = state.queenList.find((q) => q._id === queen._id)
    Object.assign(newQueen, queen)
  }
}

export const actions = {
  async addQueen({ commit }, params) {
    await this.$axios
      .post(this.$axios.defaults.baseURL + '/api/v1/queens', params)
      .then((res) => {
        if (res.status === 200) {
          commit('ADD_QUEEN', res.data)
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
        commit('SET_SELECTED_QUEEN', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  async deleteQueen({ commit }, queenId) {
    return await axios
      .delete(this.$axios.defaults.baseURL + '/api/v1/queens/' + queenId)
      .then((result) => {
        commit('REMOVE_QUEEN', queenId)
      })
      .catch((err) => {
        console.log('API-ERROR:' + err)
      })
  },

  unsetSelectedQueen({ commit }) {
    commit('SET_SELECTED_QUEEN', null)
  },

  async updateQueen({ commit }, queen) {
    console.table(queen)
    return await axios
      .put(this.$axios.defaults.baseURL + '/api/v1/queens/' + queen._id, queen)
      .then((result) => {
        commit('UPDATE_QUEEN', queen)
      })
      .catch((err) => {
        console.log('API-ERROR:' + err)
      })
  },
  agetQueenById(queen) {
    return this.getQueenById(queen)
  }
}

export const getters = {
  getQueenById: (state) => (id) => {
    console.log(state.queenList.find((queenId) => queenId._id === id))
    return state.queenList.find((queenId) => queenId._id === id)
  }
}
