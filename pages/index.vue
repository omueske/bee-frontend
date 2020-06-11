<template>
  <div>
    <h1>
      Events
    </h1>
    {{ locationList }}
    <br />
    <br />
    loc: {{ selectedLocation }}
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('locations/get')
    await store.dispatch('locations/getLocation', '5edfd6ae533e100fb04337cb')
  },

  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      selectedLocation: (state) => state.locations.selectedLocation
    })
  }
}
</script>
