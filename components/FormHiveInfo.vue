<template>
  <div>
    <label for="hiveId">Volk ID</label>
    <b-form-input
      id="hiveId"
      v-model="selectedHive._id"
      value="selectedHive._id"
      readonly
    />
    <label for="hiveName">Volk Name</label>
    <b-form-input id="hiveName" v-model="hive.name">{{
      selectedHive.name
    }}</b-form-input>
    <label for="hiveNumber">Volk Nummer</label>
    <b-form-input id="hiveNumber" v-model="hive.number">{{
      selectedHive.number
    }}</b-form-input>
    <label for="hiveComment">Kommentar</label>
    <b-form-input id="hiveComment" v-model="hive.comment">{{
      selectedHive.comment
    }}</b-form-input>
    <label for="hiveBuildType">Kommentar</label>
    <b-form-select id="hiveBuildType" v-model="hive.buildType">
      <option v-for="bt in buildTypes" :key="bt" :value="bt">{{ bt }}</option>
    </b-form-select>
    <label for="hiveStatus">Status</label>
    <b-form-select id="hiveStatus" v-model="selectedHive.status">
      <option v-for="hs in hiveStatuses" :key="hs" :value="hs">{{ hs }}</option>
    </b-form-select>

    ------------<br />
    {{ selectedHive }}
    <br />-----------
    {{ hive }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      hive: {}
    }
  },
  computed: {
    ...mapState({
      selectedHive: (state) => state.hives.selectedHive,
      buildTypes: (state) => state.bmConfig.buildTypes,
      hiveStatuses: (state) => state.bmConfig.hiveStatuses
    })
  }
}
</script>
