<template>
  <b-container>
    <div class="div-box">
      <b-row>
        <b-col>
          <b-card
            :header="hive.name"
            header-tag="header"
            footer="Card Footer"
            footer-tag="footer"
            title=""
          >
            <ButtonDeleteHive class="text-right" :hiveid="hiveid" />

            <b-card-text>
              Volk: {{ hive.number }}<br />Status:
              {{ hive.status }}</b-card-text
            >
            <hr />
            <h5>Stockkarte</h5>
            <ButtonGroupHiveLog />
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonGroupHiveLog from '@/components/ButtonGroupHiveLog'
import ButtonDeleteHive from '@/components/ButtonDeleteHive'

export default {
  components: {
    ButtonGroupHiveLog,
    ButtonDeleteHive
  },

  props: {
    hiveid: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('hives', ['getHiveById']),

    hive() {
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
