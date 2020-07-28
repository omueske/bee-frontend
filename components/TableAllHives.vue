<template>
  <b-container class="table-all-queens">
    <b-row
      ><b-col><br /></b-col
    ></b-row>
    <b-row>
      <b-col>
        <b-table hover :items="hivesList" :fields="fields">
          <template v-slot:cell(queen)="data">
            <b-row v-for="queen in data.item.queen" :key="queen._id">
              <b-col>
                {{ queen.number }}
              </b-col>
            </b-row>
          </template>
          <template v-slot:cell(buttons)="data">
            <ButtonGroupHive :hiveid="data.item._id" />
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ButtonGroupHive from '@/components/ButtonGroupHive'

export default {
  components: {
    ButtonGroupHive
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
          key: 'name',
          label: 'Name',
          sortable: false
        },
        {
          key: 'buildType',
          label: 'Bauart',
          sortable: true
        },
        {
          key: 'queen',
          label: 'Königinnen',
          sortable: false
        },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'buttons', label: 'Aktionen', sortable: false }
      ]
    }
  },

  computed: {
    ...mapState({
      hivesList: (state) => state.hives.hivesList
    })
  }
}
</script>
