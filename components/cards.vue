<template>
  <b-container>
    <div class="div-box">
      <b-row>
        <b-col>
          <b-card>
            <b-card-text
              >Volk: {{ hive.number }}<br />Status:
              {{ hive.status }}</b-card-text
            >
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
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
  margin: 3pt;
}
</style>
