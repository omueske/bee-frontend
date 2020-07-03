// import merge from 'vuex'
import axios from 'axios'

export const state = () => ({
  selectedHive: {},
  hivesList: []
})

export const mutations = {
  set(state, hives) {
    state.hivesList = hives
  },
  add(state, value) {
    state.hivesList.push(value)
  },
  remove(state, { hive }) {
    state.hivesList.splice(state.hivesList.indexOf(hive), 1)
  },
  setHive(state, hive) {
    state.selectedHive = hive
  }
}

export const actions = {
  async addHive({ commit }, params) {
    await this.$axios
      .post('http://localhost:8080/api/v1/hives', params)
      .then((res) => {
        if (res.status === 200) {
          commit('add', res.data)
          commit('setHive', res.data)
        }
      })
  },
  async get({ commit }) {
    await this.$axios.get('http://localhost:8080/api/v1/hives').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  },
  async show({ commit }, params) {
    await this.$axios
      .get(`http://localhost:8080/api/v1/hives/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('setHive', res.data)
        }
      })
  },
  async set({ commit }, hive) {
    await commit('set', hive)
  },

  async getHive({ commit }, params) {
    return await axios
      .get(`http://localhost:8080/api/v1/hives/${params}`)
      .then((res) => {
        commit('setHive', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  getHiveById: (state) => (id) => {
    return state.hivesList.find((hiveId) => hiveId._id === id)
  }
}
