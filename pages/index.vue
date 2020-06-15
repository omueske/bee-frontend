<template>
  <div><locations /></div>
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
  },
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      locationHives: (state) => state.location.locationHives
    })
  }
}
</script>
