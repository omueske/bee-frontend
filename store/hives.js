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
  },
  agetQueenByQueenId: (state) => async (id) => {
    const hive = await state.hivesList.find((hive) => hive.queen._id === id)
    console.log('---> ' + hive)
    return hive
  }

  // async getHiveQueen({ commit }) {
  //   console.log(this.$axios.defaults.baseURL)
  //   return await axios
  //     .get(this.$axios.defaults.baseURL + '/api/v1/hives') // Returns all locations
  //     .then((res) => {
  //       res = res.data
  //       for (const element of res) {
  //         // Für alle Locations (element = Eine Location)
  //         const promises = []
  //         for (const queen of element.queens) {
  //           // Für jede Königin im Volk
  //           promises.push(axios.get(this.$axios.defaults.baseURL + queen.href))
  //         }

  //         Promise.all(promises)
  //           .then(function(results) {
  //             let hiveQueen = {}
  //             const queensArr = []
  //             results.forEach(function(response) {
  //               queensArr.push(response.data)
  //               response.data.hiveId = element._id
  //             })
  //             // Delete hrefs to hives so that they can be replacec by Hive-Objects
  //             delete element.queens
  //             hiveQueen = element
  //             hiveQueen.queens = queensArr
  //             commit('add', hiveQueen)
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //           })
  //       }
  //     })
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
  }
}
