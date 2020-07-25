<template>
  <b-container class="table-all-queens">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    {{ queensList }}
    <b-row>
      <b-col>
        <b-table hover :items="hivesList" :fields="fields">
          <template v-slot:cell(comment)="data">
            {{ data.item.queen[0].comment }}
          </template>
          <template v-slot:cell(hive)="data">
            {{ data.item.name }}
          </template>
          <template v-slot:cell(queenActions)="data">
<<<<<<< HEAD
            <ButtonGroupQueen :queenid="data.item.queen_id" />
            <!-- {{ data.item.queen._id }} -->
=======
            <ButtonGroupQueen :queenid="data.item._id" />
>>>>>>> fa4a88aac9e33e26bbefeb2fe908efa5e3c9778f
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
          key: 'queen.hatchYear',
          label: 'Schlupfjahr',
          sortable: true
        },
        {
          key: 'queen.comment',
          label: 'Kommentar',
          sortable: false
        },
        { key: 'hive', label: 'Volk', sortable: true },
        { key: 'queenActions', label: 'Aktionen', sortable: false }
      ]
    }
  },

  computed: {
    ...mapState({
      queenList: (state) => state.queens.queenList,
      hivesList: (state) => state.hives.hivesList
    }),
    ...mapGetters('hives', ['getHiveNameByQueenId']),

    queensList() {
      const queensList = []
      for (const hive in this.hivesList) {
        for (const queen in hive.queen) {
          queensList.push({ hiveName: hive._id, queen })
        }
      }
      console.log(queensList)
      return queensList
    }
  }
}
</script>
