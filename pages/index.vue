<template>
  <div>
    <locations />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import locations from '@/components/locations'

export default {
  components: {
    locations
  },
  async fetch({ store }) {
    await store.dispatch('locations/get')
    await store.dispatch('locations/getLocation', '5edfd6ae533e100fb04337cb')
    await store.dispatch('hives/get')
  },

  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      selectedLocation: (state) => state.locations.selectedLocation,
      selectedHive: (state) => state.hives.selectedHive
    })
  }
}
</script>
