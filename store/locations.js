// import vuex from 'vuex'
import axios from 'axios'

export const state = () => ({
  locationHives: [],
  locationsList: []
})

export const mutations = {
  SET_LOCATION(state, locations) {
    state.locationsList = locations
  },

  ADD_HIVE_TO_LOC(state, value) {
    state.locationHives.push(value)
    // console.table(state.locationHives)
  }
}
export const actions = {
  async get({ commit }) {
    await this.$axios
      .get('http://localhost:8080/api/v1/locations')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_LOCATION', res.data)
        }
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
