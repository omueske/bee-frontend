<template>
  <div>
    <h1>Locations</h1>
    <div v-for="loc in locationList" :key="loc.id">
      <div class="div-box">
        u-Id: {{ loc._id }}
        <br />
        Name: {{ loc.name }}
        <br />
        Adresse: {{ loc.adress }}
        <br />
        Koordinaten: {{ loc.longitude }} , {{ loc.latitude }} Völker:
        <br />
        <div v-for="hive in loc.hives" :key="hive._id">
          <!-- {{ hive._id }} -->
          <hiveIcon :hiveid="hive.hiveId" />
        </div>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import hiveIcon from '@/components/hiveIcon'

export default {
  components: {
    hiveIcon
  },

  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      hivesList: (state) => state.hives.hivesList
    })
  }
}
</script>

<style scoped>
.div-box {
  border: 1px solid black;
  padding: 10px;
}
</style>
