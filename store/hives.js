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
  },
  ADD_QUEEN(state, payload) {
    console.log('payload: ' + payload)
    console.log('hiveId: ' + payload.hive)
    console.log('queen: ' + payload.queen)
    for (let i = 0; i < state.hivesList.length; i++) {
      if (state.hivesList[i] === payload.hive) {
        state.hivesList[i].queen.push(payload.queen)
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
  async deleteHive({ commit }, params) {
    console.log('--->' + params)
    await this.$axios
      .delete(this.$axios.defaults.baseURL + '/api/v1/hives/' + params)
      .then((res) => {
        if (res.status === 200) {
          commit('remove', res.data)
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
  async setSelectedHive({ commit }, params) {
    console.log('params: ' + params)
    await this.$axios
      .get(this.$axios.defaults.baseURL + `/api/v1/hives/${params}`)
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
  },
  agetQueenByQueenId: (state) => async (id) => {
    const hive = await state.hivesList.find((hive) => hive.queen._id === id)
    console.log('---> ' + hive)
    return hive
  },

  async createQueen({ commit }, payload) {
    console.log(payload)
    const hive = {}
    hive.queen = payload.queen
    await this.$axios
      .put(
        this.$axios.defaults.baseURL + '/api/v1/hives/queen/' + payload.hiveId,
        hive
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          commit('ADD_QUEEN', res.data)
        }
      })
  }
}

export const getters = {
  getHiveById: (state) => (id) => {
    return state.hivesList.find((hiveId) => hiveId._id === id)
  },
  getHiveNameByQueenId: (state) => (id) => {
    let erg = {}
    erg.name = 'not set'
    erg = state.hivesList.find((hive) =>
      hive.queen.find((queen) => queen.queenId === id)
    )
    console.log(erg)
    if (!erg) {
      return 'Kein Volk'
    }
    return erg.name
  }
}
