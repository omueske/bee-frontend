<template>
  <b-modal
    :id="'ModalModifyQueen'"
    ref="modal"
    title="Königin editieren"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="addQueenForm">
      <b-form-group id="number" label="Nummer der Königin" label-for="number">
        <b-form-input
          id="number"
          :value="stateSelectedQueen.number"
          @input="updateField('number', $event)"
        />
      </b-form-group>
      <b-form-group id="hatchYear" label="Schlupfjahr" label-for="hatchYear">
        <b-form-input
          id="hatchYear"
          :value="stateSelectedQueen.hatchYear"
          @input="updateField('hatchYear', $event)"
        />
      </b-form-group>
      <b-form-group id="pedigree" label="Abstammung" label-for="pedigree">
        <b-form-input
          id="pedigree"
          :value="stateSelectedQueen.pedigree"
          @input="updateField('pedigree', $event)"
      /></b-form-group>
      <b-form-group id="comment" label="Kommentar:" label-for="comment">
        <b-form-input
          id="comment"
          :value="stateSelectedQueen.comment"
          @input="updateField('comment', $event)"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      queen: {}
    }
  },
  computed: {
    ...mapState({
      stateSelectedQueen: (state) => state.queens.selectedQueen
    })
  },

  methods: {
    ...mapActions('queens', ['updateQueen']),

    resetModal() {
      // Is there anything todo?
    },
    async handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      this.queen._id = this.stateSelectedQueen._id
      console.table(this.queen)
      // Dispatch to API
      await this.updateQueen(this.queen)

      // unset values to avoid vuex state manipulation errors
      this.queen = {}

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('ModalModifyQueen')
      })
    },
    updateField(field, value) {
      this.queen[field] = value
    }
  }
}
</script>
