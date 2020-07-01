// import vuex from 'vuex'
import axios from 'axios'

export const state = () => ({
  currentLocation: String,
  locationHives: [],
  locationsList: []
})

export const mutations = {
  SET_LOCATION(state, locations) {
    state.locationsList = locations
  },

  SET_CURRENT_LOCATION(state, location) {
    console.log('LOC_MUT: ' + location)
    console.table(location.locid)
    state.currentLocation = location.locid
  },

  ADD_LOCATION(state, loc) {
    state.locationsList.push(loc)
  },

  ADD_HIVE_TO_LOC(state, value) {
    state.locationHives.push(value)
    // console.table(state.locationHives)
  },

  DELETE_LOCATION(state, location) {
    console.table(location)
    const delLocation = state.locationsList.findIndex((x) => x._id === location)
    state.locationsList.splice(delLocation, 1)
  }
}
export const actions = {
  setCurrentLoc({ commit }, locid) {
    console.table(locid)
    commit('SET_CURRENT_LOCATION', locid)
  },

  async get({ commit }) {
    await this.$axios
      .get('http://localhost:8080/api/v1/locations')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_LOCATION', res.data)
        }
      })
  },

  async addLocation({ commit }, data) {
    console.table(data.latitude)
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
    console.log('Loc: ' + payload.location)
    console.log('HiveLoc: ' + payload.hive)
    await axios
      .post(
        'http://localhost:8080/api/v1/locations/' +
          payload.location +
          '/' +
          payload.hive
      )
      .then((result) => {
        console.log(result.data)
        // commit('DELETE_LOCATION', payload)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async deleteLocation({ commit }, payload) {
    console.log('Payload ' + payload)
    await axios
      .delete('http://localhost:8080/api/v1/locations/' + payload)
      .then((result) => {
        console.log(result.data)
        commit('DELETE_LOCATION', payload)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async getLocationsHives({ commit }) {
    console.log('getLocationsHives called ')

    return await axios
      .get(`http://localhost:8080/api/v1/locations`) // Returns all locations
      .then((res) => {
        res = res.data
        for (const element of res) {
          const promises = []
          for (const hive of element.hives) {
            // Für jeses Volk in der Location
            console.log('Calling: ' + `http://localhost:8080` + hive.href)
            promises.push(axios.get(`http://localhost:8080` + hive.href))
          }

          Promise.all(promises)
            .then(function(results) {
              results.forEach(function(response) {
                response.data.locId = element._id
                commit('ADD_HIVE_TO_LOC', response.data)
              })
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
    return state.locationsList.find((locId) => locId._id === id)
  },
  getHivesByLoc: (state) => (id) => {}
}
