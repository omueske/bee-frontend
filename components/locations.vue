<template>
  <div>LOCATIONS liste: {{ locationList }}</div>
</template>

<script>
export default {
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      location: (state) => state.locations.location
    })
  },

  async fetch({ store }) {
    await store.dispatch('locations/show', '5edfd6ae533e100fb04337cb')
  }
}
</script>
