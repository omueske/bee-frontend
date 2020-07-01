<template>
  <b-container class="location-box">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    <b-row>
      <b-col>Standort: {{ loc.name }}</b-col>
      <b-col><ButtonAddHive class="text-right" :locid="locid" /> </b-col>
      <b-col><ButtonGroupLocation :locid="locid"/></b-col
    ></b-row>
    <b-row class="mb-3">
      <b-col>
        <b-row>
          <b-col v-for="hive in loc.hives" :key="hive._id" cols="3">
            <hiveCard :hiveid="hive.hiveId" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import hiveCard from '@/components/hiveCard'
import ButtonAddHive from '@/components/ButtonAddHive'
import ButtonGroupLocation from '@/components/ButtonGroupLocation'

export default {
  components: {
    hiveCard,
    ButtonAddHive,
    ButtonGroupLocation
  },
  props: {
    locid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('locations', ['getLocById']),
    ...mapActions('locations', ['deleteLocation']),

    loc() {
      // console.log(this.getLocById(this.locid))
      return this.getLocById(this.locid)
    }
  }
}
</script>

<style scoped>
.location-box {
  background-color: #eedd82;
  border-radius: 0.3rem;
}
</style>
