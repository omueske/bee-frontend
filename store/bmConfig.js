export const state = () => ({
  buildTypes: [],
  beeRaces: [],
  hiveStatuses: []
})

export const mutations = {
  SET_BM_CONFIG(state, bmConfig) {
    state.buildTypes = bmConfig.buildTypes
    state.beeRaces = bmConfig.beeRace
    state.hiveStatuses = bmConfig.hiveStatuses
  }
}
export const actions = {
  loadDefaultConfig({ commit }) {
    const bmConfig = require('@/config/beeManagerDefaultValues')
    console.table(bmConfig)
    commit('SET_BM_CONFIG', bmConfig)
  }
}
