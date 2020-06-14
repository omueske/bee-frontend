<template>
  <div class="div-box">H: {{ hiveid }} {{ selectedHive._id }}</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    hiveid: {
      type: String,
      required: true
    }
  },

  async fetch({ store }) {
    this.getHive('5edbba4a95a7c539845fe782')
    console.log('Passing: ' + this.hiveid)
    await store.dispatch('hives/getHive', '5edbba4a95a7c539845fe782')
    await store.dispatch('locations/getLocationsHives')
  },

  computed: {
    ...mapState({
      selectedHive: (state) => state.hives.selectedHive
    })
  },

  watch: {
    selectedHive: {
      deep: true,
      handler() {
        console.log('selectedHive has changed')
      }
    }
  },
  created() {
    console.log('id: ' + this.hiveid)
    // this.getHive('5edbba4a95a7c539845fe782')
    this.getLocationsHives('5edfd6ae533e100fb04337cb')
  },

  methods: {
    ...mapActions('hives', ['getHive']),
    ...mapActions('hives', ['show']),
    ...mapActions('locations', ['getLocationsHives'])
  }
}
</script>

<style scoped>
.div-box {
  /* width: 49%; */
  border: 1px solid black;
  padding: 10px;
}
</style>
