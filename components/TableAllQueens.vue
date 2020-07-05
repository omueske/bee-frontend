<template>
  <b-container class="table-all-queens">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    <b-row>
      <b-col>
        <b-table hover :items="queenList" :fields="fields">
          <!-- <template slot="isMember" slot-scope="{ item: { deleteQueen } }"> -->
          <template slot="deleteQueen" slot-scope="{ item: { deleteQueen } }">
            <b-icon-trash :action="deleteQueen" />
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
