<template>
  <b-container class="location-box">
    <b-row>
      <b-col
        ><h3>{{ loc.name }}</h3></b-col
      ></b-row
    >
    <b-row class="mb-3">
      <b-col>
        <b-row>
          <b-col v-for="hive in loc.hives" :key="hive._id" cols="3">
            <cards :hiveid="hive.hiveId" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import cards from '@/components/cards'

export default {
  components: {
    cards
  },
  props: {
    locid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('locations', ['getLocById']),

    loc() {
      console.log(this.getLocById(this.locid))
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
