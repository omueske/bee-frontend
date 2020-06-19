<template
  ><div>
    <b-container>
      <b-row
        ><b-col><h1>Locations</h1></b-col></b-row
      ><b-row
        ><b-col><ButtonAddLocation /></b-col
      ></b-row>
      <b-row v-for="loc in locationList" :key="loc._id" cols="1"
        ><b-col>
          <locationBox :locid="loc._id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import locationBox from '@/components/locationBox'
import ButtonAddLocation from '@/components/ButtonAddLocation'

export default {
  components: {
    ButtonAddLocation,
    locationBox
  },
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      hivesList: (state) => state.hives.hivesList
    })
  },
  created() {
    this.$store.dispatch('hives/get')
    this.$store.dispatch('locations/get')
  }
}
</script>

<style scoped></style>
