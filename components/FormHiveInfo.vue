<template>
  <div>
    <label for="hiveId">Volk ID</label>
    <b-form-input
      id="hiveId"
      v-model="lSelectedHive._id"
      value="lSelectedHive._id"
      readonly
    />
    <label for="hiveName">Volk Name</label>
    <b-form-input id="hiveName" v-model="lSelectedHive.name"></b-form-input>
    <label for="hiveNumber">Volk Nummer</label>
    <b-form-input id="hiveNumber" v-model="lSelectedHive.number"></b-form-input>
    <label for="hiveComment">Kommentar</label>
    <b-form-input
      id="hiveComment"
      v-model="lSelectedHive.comment"
    ></b-form-input>
    <label for="hiveBuildType">Kommentar</label>
    <b-form-select id="hiveBuildType" v-model="lSelectedHive.buildType">
      <option v-for="bt in buildTypes" :key="bt" :value="bt">{{ bt }}</option>
    </b-form-select>
    <label for="hiveStatus">Status</label>
    <b-form-select id="hiveStatus" v-model="lSelectedHive.status">
      <option v-for="hs in hiveStatuses" :key="hs" :value="hs">{{ hs }}</option>
    </b-form-select>
    <b-button @click="updateSelectedHive(lSelectedHive)">Click me</b-button>

    {{ lSelectedHive.name }}<br /><br />
    {{ selectedHive.name }}
    {{ this.$refs }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      selectedHive: (state) => state.hives.selectedHive,
      buildTypes: (state) => state.bmConfig.buildTypes,
      hiveStatuses: (state) => state.bmConfig.hiveStatuses
    }),

    lSelectedHive() {
      // if (this.selectedHive) {
      //   const x = JSON.parse(JSON.stringify(this.selectedHive))
      //   return x
      // } else {
      //   return {}
      // }
      return JSON.parse(JSON.stringify(this.selectedHive))
    }
  },
  methods: {
    ...mapActions('hives', ['updateSelectedHive'])
  }
}
</script>
