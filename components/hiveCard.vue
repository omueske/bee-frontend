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
            <b-card-text
              >Volk: {{ hive.number }}<br />Status:
              {{ hive.status }}</b-card-text
            >
            <hr />
            <h5>Stockkarte</h5>
            <ButtonGroupHive />
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonGroupHive from '@/components/ButtonGroupHive'

export default {
  components: {
    ButtonGroupHive
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
