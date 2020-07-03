// import vuex from 'vuex'
import axios from 'axios'

export const state = () => ({
  currentLocation: String,
  locationList: []
})

export const mutations = {
  SET_LOCATION_LIST(state, locations) {
    state.locationList.push(locations)
  },

  SET_CURRENT_LOCATION(state, location) {
    state.currentLocation = location.locid
  },

  ADD_LOCATION(state, loc) {
    state.locationList.push(loc)
  },

  ADD_HIVE_TO_LOCATION(state, payload) {
    for (let i = 0; i < state.locationList.length; i++) {
      if (state.locationList[i]._id === payload.location) {
        state.locationList[i].hives.push(payload.hiveObj)
      }
    }
  },

  DELETE_HIVE_FROM_LOCATION(state, hiveId) {
    for (let i = 0; i < state.locationList.length; i++) {
      let delHive = state.locationList[i].hives.findIndex(
        (x) => x._id === hiveId
      )

      // Das löschen nur ausführen wenn mehr als 0 Elemente gefunden werden
      // Ansonsten wird in jeder Location ein Element aus dem Store gelöscht
      if (delHive > 0) {
        console.log('Deleting in Loc: ' + state.locationList[i].name)
        state.locationList[i].hives.splice(delHive, 1)
        delHive = 0
      }
    }
  },

  DELETE_LOCATION(state, location) {
    const delLocation = state.locationList.findIndex((x) => x._id === location)
    state.locationList.splice(delLocation, 1)
  }
}
export const actions = {
  setCurrentLoc({ commit }, locid) {
    commit('SET_CURRENT_LOCATION', locid)
  },

  async get({ commit }) {
    await this.$axios
      .get('http://localhost:8080/api/v1/locations')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_LOCATION_LIST', res.data)
        }
      })
  },

  async addLocation({ commit }, data) {
    await axios
      .post('http://localhost:8080/api/v1/locations', data)
      .then((result) => {
        commit('ADD_LOCATION', result.data)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async addHiveToLocation({ commit }, payload) {
    await axios
      .post(
        'http://localhost:8080/api/v1/locations/' +
          payload.location +
          '/' +
          payload.hive
      )
      .then((result) => {
        commit('ADD_HIVE_TO_LOCATION', payload)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async deleteHiveFromLocation({ commit }, hiveId) {
    await axios
      .delete('http://localhost:8080/api/v1/locations/unlink/' + hiveId)
      .then((result) => {
        commit('DELETE_HIVE_FROM_LOCATION', hiveId)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async deleteLocation({ commit }, payload) {
    await axios
      .delete('http://localhost:8080/api/v1/locations/' + payload)
      .then((result) => {
        commit('DELETE_LOCATION', payload)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async getLocationsHives({ commit }) {
    return await axios
      .get(`http://localhost:8080/api/v1/locations`) // Returns all locations
      .then((res) => {
        res = res.data
        for (const element of res) {
          // Für alle Locations (element = Eine Location)
          const promises = []
          for (const hive of element.hives) {
            // Für jeses Volk in der Location
            promises.push(axios.get(`http://localhost:8080` + hive.href))
          }

          Promise.all(promises)
            .then(function(results) {
              let locHive = {}
              const hivesArr = []
              results.forEach(function(response) {
                hivesArr.push(response.data)
                response.data.locId = element._id
              })
              // Delete hrefs to hives so that they can be replacec by Hive-Objects
              delete element.hives
              locHive = element
              locHive.hives = hivesArr
              commit('SET_LOCATION_LIST', locHive)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  }
}
export const getters = {
  getLocById: (state) => (id) => {
    return state.locationList.find((locId) => locId._id === id)
  },
  getHivesByLoc: (state) => (id) => {}
}
