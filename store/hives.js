// import merge from 'vuex'
import axios from 'axios'

export const state = () => ({
  selectedHive: {},
  hivesList: [],
  queens: []
})

export const mutations = {
  LOAD_HIVE_QUEENS(state, hives) {
    state.hivesQueens = hives
  },
  UPDATE_HIVESLIST(state, hive) {
    for (let i = 0; i < state.hivesList.length; i++) {
      console.log(state.hivesList[i]._id + ' <====> ' + hive._id)
      if (state.hivesList[i]._id === hive._id) {
        state.hivesList.splice(i, 1, hive)
      }
    }
  },

  set(state, hives) {
    state.hivesList = hives

    const queens = []
    for (const hive of hives) {
      // console.log('Hive' + hive)
      if (hive.queen.length > 0) {
        // queen.hive = {}
        for (const queen of hive.queen) {
          queen.hive = {}
          queen.hive._id = hive._id
          queen.hive.name = hive.name
          state.queens.push(queen)
        }
      }
    }
    console.table(queens)
    // state.queens = queens
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
  ADD_QUEEN_TO_HIVE(state, payload) {
    console.log(payload)
    console.table(payload)
    for (let i = 0; i < state.hivesList.length; i++) {
      if (payload.hiveId === state.hivesList[i]._id) {
        console.log('match ')

        state.hivesList[i].queen.push(payload.queenId)
      }
    }
  },
  REMOVE_QUEEN_FROM_HIVE(state, { queenId }) {
    for (let i = 0; i < state.hivesList.length; i++) {
      let delQueen = state.hivesList[i].queen.findIndex(
        (x) => x._id === queenId
      )

      // Das löschen nur ausführen wenn mehr als 0 Elemente gefunden werden
      // Ansonsten wird in jeder Location ein Element aus dem Store gelöscht
      if (delQueen > 0) {
        state.hivesList[i].queen.splice(delQueen, 1)
        delQueen = 0
      }
    }
  },
  REMOVE_QUEEN_FROM_QUEENS(state, queenId) {
    console.log('QID: ' + queenId)
    let delQueen = state.queens.findIndex((x) => x._id === queenId)

    // Das löschen nur ausführen wenn mehr als 0 Elemente gefunden werden
    // Ansonsten wird in jeder Location ein Element aus dem Store gelöscht
    if (delQueen > 0) {
      state.queens.splice(delQueen, 1)
      delQueen = 0
    }
  },

  ADD_QUEEN(state, payload) {
    console.log('payload: ' + payload)
    console.log('hiveId: ' + payload.hive)
    console.log('queen: ' + payload.queen)
    // TODO: HIVE-Object must be added for Hive-Array and whats about _id?
    state.queens.push(payload.queen)
    for (let i = 0; i < state.hivesList.length; i++) {
      if (state.hivesList[i] === payload.hive) {
        state.hivesList[i].queen.push(payload.queen)
      }
    }
  },
  LOAD_QUEENS(state, queens) {
    state.queens = queens
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

  updateSelectedHive({ commit }, hive) {
    // console.table(hive)
    this.$axios
      .put(this.$axios.defaults.baseURL + '/api/v1/hives/' + hive._id, hive)
      .then((res) => {
        if (res.status === 200) {
          // console.table(res.data.data)
          commit('setHive', hive)
          commit('UPDATE_HIVESLIST', hive)
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
        commit('REMOVE_QUEEN_FROM_HIVE', queenId)
        console.table(res.data)
        commit('REMOVE_QUEEN_FROM_QUEENS', queenId)
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
  },
  async moveQueenToHive({ commit }, payload) {
    return await axios
      .patch(
        this.$axios.defaults.baseURL +
          '/api/v1/hives/queen/' +
          payload.queenId +
          '/' +
          payload.hiveId
      )
      .then((res) => {
        commit('REMOVE_QUEEN_FROM_HIVE', res.data)
        commit('ADD_QUEEN_TO_HIVE', payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // loadQueens({ commit, state }) {
  //   const queensList = []
  //   for (const hive of state.hivesList) {
  //     // console.log(state.hivesList)
  //     console.log('Hive' + hive)
  //     for (const queen of hive.queen) {
  //       console.log('Queen' + queen)
  //       queensList.push({ hiveName: hive.name, queen })
  //     }
  //   }
  //   console.log(queensList)
  //   commit('LOAD_QUEENS')
  // }
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
  },
  getIsQueenLinkedToHive: (state) => (id) => {
    console.log('id' + id)
    if (this.getHiveNameByQueenId(id)) return true
  }
}
