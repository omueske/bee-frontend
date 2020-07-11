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
  },
  REMOVE_QUEEN_FROM_HIVE(state, { queenId }) {
    for (let i = 0; i < state.hivesList.length; i++) {
      let delQueen = state.hivesList[i].queen.findIndex(
        (x) => x._id === queenId
      )

      // Das löschen nur ausführen wenn mehr als 0 Elemente gefunden werden
      // Ansonsten wird in jeder Location ein Element aus dem Store gelöscht
      if (delQueen > 0) {
        console.log('Deleting in Hive: ' + state.hiveList[i]._id)
        state.hivesList[i].queen.splice(delQueen, 1)
        delQueen = 0
      }
    }
  }
}

export const actions = {
  async addHive({ commit }, params) {
    await this.$axios
      .post(this.$axios.defaults.baseURL + '/api/v1/hives', params)
      .then((res) => {
        if (res.status === 200) {
          commit('add', res.data)
          commit('setHive', res.data)
        }
      })
  },
  async get({ commit }) {
    await this.$axios
      .get(this.$axios.defaults.baseURL + '/api/v1/hives')
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async show({ commit }, params) {
    await this.$axios
      .get(this.$axios.defaults.baseURL + `/api/v1/hives/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          commit('setHive', res.data)
        }
      })
  },
  async set({ commit }, hive) {
    await commit('set', hive)
  },

  async getHive({ commit }, params) {
    return await axios
      .get(this.$axios.defaults.baseURL + `/api/v1/hives/${params}`)
      .then((res) => {
        commit('setHive', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  async unLinkQueenFromHive({ commit }, queenId) {
    return await axios
      .delete(this.$axios.defaults.baseURL + '/api/v1/hives/queen/' + queenId)
      .then((res) => {
        commit('REMOVE_QUEEN_FROM_HIVE', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getters = {
  getHiveById: (state) => (id) => {
    return state.hivesList.find((hiveId) => hiveId._id === id)
  },
  getHiveByQueenId: (state) => (id) => {
    return state.hivesList.find((hive) => hive.queen._id === id)
  }
}
