<template>
  <b-modal
    :id="'ModalMoveQueen-' + queenid"
    ref="modal"
    title="Königin Volk zuordnen"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="moveQueenForm">
      <b-form-group id="hive" label="Bitte Volk auswählen" label-for="hive">
        <b-form-select
          v-model="selected"
          :options="options"
          size="sm"
          class="mt-3"
          @change="updateField('hiveId', $event)"
        ></b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    queenid: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      queen: {},
      selected: null
    }
  },

  computed: {
    ...mapState({
      stateHivesList: (state) => state.hives.hivesList,
      stateSelectedQueen: (state) => state.queens.selectedQueen
    }),
    options() {
      const op = []
      op.push({ value: null, text: 'Bitte Volk auswählen' })
      for (const hive of this.stateHivesList) {
        op.push({ value: hive._id, text: hive.name })
      }
      return op
    }
  },
  methods: {
    ...mapActions('queens', ['setSelectedQueen']),
    ...mapActions('hives', ['moveQueenToHive']),

    resetModal() {
      // Is there anything todo?
    },
    async handleOk(event) {
      // todo
      // Check if hive is Queen is allready linked to an hive
      // Link Queen with new Hive
      // Set selected Queen to
      await this.setSelectedQueen(this.queenid)

      // Prevent modal from closing
      event.preventDefault()
      console.log('this.stateSelectedQueen._id: ' + this.stateSelectedQueen._id)
      this.queen.queenId = this.stateSelectedQueen._id
      console.table(this.stateSelectedQueen)
      console.table(this.queen)
      // Dispatch to API
      await this.moveQueenToHive(this.queen)
      // unset values to avoid vuex state manipulation errors
      this.queen = {}
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('ModalMoveQueen-' + this.queenid)
      })
    },
    updateField(field, value) {
      this.queen[field] = value
      console.log(this.queen)
    }
  }
}
</script>
