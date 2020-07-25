<template
  ><div>
    <b-container>
      <b-row
        ><b-col><h1>Völker</h1></b-col></b-row
      >
      <b-row>
        <b-col>
          <b-button @click="hiveTableisVisible = !hiveTableisVisible"
            >Tabelle ein/ausblenden</b-button
          >
          <TableAllHives v-if="hiveTableisVisible" />
        </b-col>
      </b-row>
      <BodyHiveInfo />
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import TableAllHives from '@/components/TableAllHives'
import BodyHiveInfo from '@/components/BodyHiveInfo'

export default {
  components: {
    BodyHiveInfo,
    TableAllHives
  },

  data: () => ({
    hiveTableisVisible: true
  }),
  computed: {
    ...mapState({
      hiveList: (state) => state.hives.hivesList
    })
  },

  created() {
    this.$store.dispatch('hives/get')
    this.$store.dispatch('bmConfig/loadDefaultConfig')
  }
}
</script>

<style scoped></style>
