<template>
  <b-container class="table-all-queens">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    <b-row>
      <b-col>
        <b-table hover :items="queenList" :fields="fields">
          <!-- <template slot="isMember" slot-scope="{ item: { deleteQueen } }"> -->
          <template v-slot:cell(deleteQueen)="data">
            <ButtonDeleteQueen :queenid="data.item._id" />
            {{ data.item._id }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ButtonDeleteQueen from '@/components/ButtonDeleteQueen'

export default {
  components: {
    ButtonDeleteQueen
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
        { key: 'deleteQueen', label: 'Löschen', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      stateQueen: (state) => state.queens.selectedQueen,
      queenList: (state) => state.queens.queenList
    })
  }
}
</script>
