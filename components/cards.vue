<template>
  <b-container>
    <div>
      <b-row>
        <div>
          <b-col l="4">
            <b-card>
              <b-card-text
                >Volk: {{ hive.number }}<br />Status:
                {{ hive.status }}</b-card-text
              >
              <b-button href="#" variant="primary">blubb</b-button>
            </b-card>
          </b-col>
        </div>
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
