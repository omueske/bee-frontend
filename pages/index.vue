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
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList
    })
  },
  created() {
    this.$store.dispatch('hives/get')
    this.$store.dispatch('locations/get')
  }
}
</script>
