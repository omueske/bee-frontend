<template>
  <b-container class="table-all-queens">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    <b-row>
      <b-col>
        <b-table hover :items="queens" :fields="fields">
          <template v-slot:cell(queenActions)="data">
            <ButtonGroupQueen :queenid="data.item._id" />
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ButtonGroupQueen from '@/components/ButtonGroupQueen'

export default {
  components: {
    ButtonGroupQueen
  },
  data() {
    return {
      fields: [
        {
          key: '_id',
          sortable: true
        },
        {
          key: 'number',
          label: 'Nummer',
          sortable: true
        },
        {
          key: 'pedigree',
          label: 'Abstammung',
          sortable: false
        },
        {
          key: 'hatchYear',
          label: 'Schlupfjahr',
          sortable: true
        },
        {
          key: 'comment',
          label: 'Kommentar',
          sortable: false
        },
        { key: 'hive.name', label: 'Volk', sortable: true },
        { key: 'queenActions', label: 'Aktionen', sortable: false }
      ]
    }
  },

  computed: {
    ...mapState({
      hivesList: (state) => state.hives.hivesList,
      queens: (state) => state.hives.queens
    })
  }
}
</script>
