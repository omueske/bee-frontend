import merge from 'vuex'
import axios from 'axios'

export const state = () => ({
  selectedLocation: {},
  locationsList: [],
  locationHives: []
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
  },
  setLocationsHives(state, locH) {
    // state.locationHives.add(locH)
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
  },

  // async getLocationsHives({ commit }, params) {
  //   console.log('getLocationsHives called' + params)
  //   return await axios
  //     .get(`http://localhost:8080/api/v1/locations`)
  //     .then((res) => {
  //       for (let i = 0; i < res.data.length; i++) {
  //         for (let j = 0; j < res.data[i].hives.length; j++) {
  //           res.data[i].hives[j] =
  //             'http://localhost:8080/api/v1' + res.data[i].hives[j].href
  //           console.log(res.data[i].hives[j])
  //           res.data[i].hivedata = axios.all(res.data[i].hives[j])
  //           console.table('data' + res.data[i].hivedata)
  //         }
  //       }
  //       console.log(res.data)
  //       console.log(typeof res.data)
  //       commit('setLocationsHives', res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  /* Todo
  - Promise all muss je locaion in seperater schleife laufen
  momentan werden alle Hives in einem array gespeichert - ohne zuordnung zur location
*/
  async getLocationsHives({ commit }, params) {
    console.log('getLocationsHives called' + params)
    const locHives = []
    await axios
      .get(`http://localhost:8080/api/v1/locations`) // Returns all locations
      .then((res) => {
        res = res.data
        // console.table(res)
        for (const element of res) {
          // for (let i = 0; i < res.length; i++) {
          const promises = []
          for (const hive of element.hives) {
            console.log('Calling: ' + `http://localhost:8080` + hive.href)
            // console.table(element.hives)
            promises.push(axios.get(`http://localhost:8080` + hive.href))
          }
          Promise.all(promises)
            .then(function(results) {
              results.forEach(function(response) {
                // console.log(response)
                // console.table(
                //  'data: ' + response.data._id + '  <--- Loc ' + element._id
                // )
                locHives.push({ loc: element._id, hive: response.data })
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
        console.table(locHives) // <--- Nun das ganze noch ausserhalb eine ebene Höher abfragen können
      })
    // console.table(locHives[0])
  }
}
