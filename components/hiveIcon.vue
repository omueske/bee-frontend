<template>
  <div class="div-box">hive: {{ hive.number }}H: {{ hive.status }}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    hiveid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('hives', ['getHiveById']),

    hive() {
      console.log(this.getHiveById(this.hiveid))
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
