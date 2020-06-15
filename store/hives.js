import merge from 'vuex'
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
    merge(state.hivesList, value)
  },
  remove(state, { hive }) {
    state.hivesList.splice(state.hivesList.indexOf(hive), 1)
  },
  setHive(state, hive) {
    state.selectedHive = hive
    console.table(state.selectedHive)
  }
}

export const actions = {
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
          console.log('ID: ' + params.id)
          commit('setHive', res.data)
        }
      })
  },
  async set({ commit }, hive) {
    await commit('set', hive)
  },

  async getHive({ commit }, params) {
    console.log('getHive called' + params)
    return await axios
      .get(`http://localhost:8080/api/v1/hives/${params}`)
      .then((res) => {
        // console.log(res.data)
        console.log(typeof res.data)
        commit('setHive', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
