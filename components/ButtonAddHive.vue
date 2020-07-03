<template
  ><div>
    <b-button
      v-b-modal="'modal-add-hive-' + locid"
      pill
      variant="outline-secondary"
      size="sm"
    >
      Neues Volk
    </b-button>

    <b-modal
      :id="'modal-add-hive-' + locid"
      ref="modal"
      title="Neues Volk anlegen"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="addHiveForm">
        <b-form-group id="number" label="Eigene Volk-Nummer" label-for="number">
          <b-form-input
            id="number"
            :value="hive.number"
            @input="updateField('number', $event)"
          />
        </b-form-group>
        <b-form-group id="name" label="Name" label-for="name">
          <b-form-input
            id="name"
            :value="hive.name"
            @input="updateField('name', $event)"
        /></b-form-group>
        <b-form-group id="buildType" label="Rähmchenmaß" label-for="buildType">
          <b-form-input
            id="buildType"
            :value="hive.buildType"
            @input="updateField('buildType', $event)"
        /></b-form-group>
        <b-form-group id="comment" label="Kommentar:" label-for="comment">
          <b-form-input
            id="comment"
            :value="hive.comment"
            @input="updateField('comment', $event)"
          />
        </b-form-group>
        <b-form-group id="status" label="Status" label-for="status">
          <b-form-select
            id="status"
            v-model="selected"
            :options="options"
            size="sm"
            class="mt-3"
            @click="updateField('status', $event)"
          ></b-form-select
        ></b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    locid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Bitte auswählen...' },
        { value: 'active', text: 'Aktiv' },
        { value: 'inactive', text: 'Nicht Aktiv' }
      ],
      hive: {
        number: '',
        name: '',
        buildType: '',
        comment: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapState({
      stateHive: (state) => state.hives.selectedHive
    })
  },
  methods: {
    ...mapActions('hives', ['addHive']),
    ...mapActions('locations', ['addHiveToLocation']),

    resetModal() {
      this.stateLocName = null
    },
    async handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      // Dispatch to API
      await this.addHive(this.hive)
      const payload = {
        location: this.locid,
        hive: this.stateHive._id,
        hiveObj: this.stateHive
      }

      await this.addHiveToLocation(payload)
      // unset values to avoid vuex state manipulation errors
      this.hive = {
        number: '',
        name: '',
        buildType: '',
        comment: '',
        status: ''
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add-hive-' + this.locid)
      })
    },
    updateField(field, value) {
      this.hive[field] = value
    }
  }
}
</script>
