import merge from 'vuex'
import axios from 'axios'

export const state = () => ({
  selectedLocation: {},
  locationsList: []
})

export const mutations = {
  set(state, locations) {
    state.locationsList = locations
  },
  add(state, value) {
    merge(state.locationsList, value)
  },
  remove(state, { location }) {
    state.locationsList.splice(state.locationsList.indexOf(location), 1)
  },
  setLocation(state, loc) {
    state.selectedLocation = loc
    console.table(state.selectedLocation)
  }
}

export const actions = {
  async get({ commit }) {
    await this.$axios
      .get('http://localhost:8080/api/v1/locations')
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async show({ commit }, params) {
    await this.$axios
      .get(`http://localhost:8080/api/v1/locations/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('setLocation', res.data)
        }
      })
  },
  async set({ commit }, location) {
    await commit('set', location)
  },

  async getLocation({ commit }, params) {
    console.log('getLocation called' + params)
    return await axios
      .get(`http://localhost:8080/api/v1/locations/${params}`)
      .then((res) => {
        console.log(res.data)
        console.log(typeof res.data)
        commit('setLocation', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
