<template>
  <b-modal
    :id="'ModalAddQueen'"
    ref="modal"
    title="Neues Königin anlegen"
    @hidden="resetModal"
    @ok="handleOk"
  >
    {{ stateQueen._id }}
    <form ref="addQueenForm">
      <b-form-group id="number" label="Nummer der Königin" label-for="number">
        <b-form-input
          id="number"
          :value="this.queen.number"
          @input="updateField('number', $event)"
        />
      </b-form-group>
      <b-form-group id="hatchYear" label="Schlupfjahr" label-for="hatchYear">
        <b-form-input
          id="hatchYear"
          :value="this.queen.hatchYear"
          @input="updateField('hatchYear', $event)"
        />
      </b-form-group>
      <b-form-group id="pedigree" label="Abstammung" label-for="pedigree">
        <b-form-input
          id="pedigree"
          :value="this.queen.pedigree"
          @input="updateField('pedigree', $event)"
      /></b-form-group>
      <b-form-group id="comment" label="Kommentar:" label-for="comment">
        <b-form-input
          id="comment"
          :value="this.queen.comment"
          @input="updateField('comment', $event)"
        />
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    doUpdate: Boolean
  },

  data() {
    return {
      queen: {
        number: '',
        hatchYear: '',
        pedigree: '',
        comment: ''
      }
    }
  },
  computed: {
    ...mapState({
      stateQueen: (state) => state.queens.selectedQueen
    })
  },

  methods: {
    ...mapActions('queens', ['addQueen']),

    resetModal() {
      console.log('Reseting Store')
    },
    async handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      // Dispatch to API
      await this.addQueen(this.queen)

      // unset values to avoid vuex state manipulation errors
      this.queen = {
        number: '',
        hatchYear: '',
        pedgree: '',
        comment: ''
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('ModalAddQueen')
      })
    },
    updateField(field, value) {
      this.queen[field] = value
    }
  }
}
</script>
