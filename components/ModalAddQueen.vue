<template>
  <b-modal
    :id="'ModalAddQueen'"
    ref="modal"
    title="Neues Königin anlegen"
    @hidden="resetModal"
    @ok="handleOk"
  >
    {{ stateQueen._id }}
    <form ref="createQueenForm">
      <b-form-group id="number" label="Nummer der Königin" label-for="number">
        <b-form-input
          id="number"
          :value="queen.number"
          @input="updateField('number', $event)"
        />
      </b-form-group>
      <b-form-group id="hatchYear" label="Schlupfjahr" label-for="hatchYear">
        <b-form-input
          id="hatchYear"
          :value="queen.hatchYear"
          @input="updateField('hatchYear', $event)"
        />
      </b-form-group>
      <b-form-group id="pedigree" label="Abstammung" label-for="pedigree">
        <b-form-input
          id="pedigree"
          :value="queen.pedigree"
          @input="updateField('pedigree', $event)"
      /></b-form-group>
      <b-form-group id="comment" label="Kommentar:" label-for="comment">
        <b-form-input
          id="comment"
          :value="queen.comment"
          @input="updateField('comment', $event)"
        />
      </b-form-group>
      <b-form-group id="hive" label="Volk:" label-for="hive">
        <b-form-select id="hive" :value="hiveId" @change="updateHiveId($event)">
          <option
            v-for="hive in stateHivesList"
            :key="hive._id"
            :value="hive._id"
          >
            {{ hive.name }}
          </option>
          ></b-form-select
        >
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
        race: '',
        comment: ''
      },
      hiveId: ''
    }
  },
  computed: {
    ...mapState({
      stateQueen: (state) => state.queens.selectedQueen,
      stateHivesList: (state) => state.hives.hivesList
    })
  },

  methods: {
    ...mapActions('hives', ['createQueen']),

    resetModal() {
      console.log('Reseting Store')
    },
    async handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      const payload = { queen: this.queen, hiveId: this.hiveId }
      // Dispatch to API
      await this.createQueen(payload)

      // unset values to avoid vuex state manipulation errors
      this.queen = {
        number: '',
        hatchYear: '',
        pedgree: '',
        race: '',
        comment: ''
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('ModalAddQueen')
      })
    },
    updateField(field, value) {
      this.queen[field] = value
    },
    updateHiveId(id) {
      console.log('--->' + id)
      this.hiveId = id
    }
  }
}
</script>
