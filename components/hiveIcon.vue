<template>
  <div class="div-box">H: {{ hiveid }} Hive: {{ hive }}</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    hiveid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList
    }),

    ...mapGetters('hives', ['getHiveById']),

    hive() {
      return this.getHiveById(this.hiveid)
    }
  }
}
</script>

<style scoped>
.div-box {
  /* width: 49%; */
  border: 1px solid black;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 2px;
}
</style>
