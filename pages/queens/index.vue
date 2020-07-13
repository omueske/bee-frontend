<template
  ><div>
    <b-container>
      <b-row
        ><b-col><h1>Königinnen</h1></b-col></b-row
      ><b-row
        ><b-col><ButtonAddQueen /></b-col>
      </b-row>
      <b-row>
        <b-col>
          <TableAllQueens />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonAddQueen from '@/components/ButtonAddQueen'
import TableAllQueens from '@/components/TableAllQueens'

export default {
  components: {
    ButtonAddQueen,
    TableAllQueens
  },
  computed: {
    ...mapState({
      queenList: (state) => state.queens.queenList
    })
  },
  created() {
    this.$store.dispatch('queens/loadQueens')

    this.$store.dispatch('hives/get')
    this.$store.dispatch('locations/getLocationsHives')
  }
}
</script>

<style scoped></style>
