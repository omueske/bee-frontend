<template>
  <b-row>
    <b-col>
      <b-button-group size="sm">
        <b-button v-b-modal="'add-modal-hive'" variant="outline-secondary">
          <b-icon-plus-circle />
        </b-button>
        <b-button
          v-b-modal="'delete-modal-location-' + locid"
          variant="outline-secondary"
        >
          <b-icon-trash />
        </b-button>
        <b-modal
          :id="'delete-modal-location-' + locid"
          ref="modal"
          title="Soll der Standort wirklich gelöscht werden?"
          @show="resetModal"
          @ok="handleOk"
        >
          LOC: {{ locid }}
          <template v-slot:modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="danger" @click="ok()">
              Löschen
            </b-button>
            <b-button size="sm" variant="success" @click="cancel()">
              Abbrechen
            </b-button>
          </template>
        </b-modal>
      </b-button-group>
    </b-col>
  </b-row>
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
  methods: {
    ...mapActions('locations', ['deleteLocation']),
    ...mapState({ locationsList: (state) => state.locations.locationsList }),

    resetModal() {
      this.stateLocName = null
    },
    handleOk(event) {
      console.log('Event Called')
      console.table(event)
      // Prevent modal from closing
      event.preventDefault()

      // Check if there are Hives left, so the Location cannot be deleted
      if (this.locationsList.hives.length === 0) {
        // Dispatch to API
        console.log('Loc: ' + this.locid)
        this.deleteLocation(this.locid)
      } else {
        console.log('Kann Standort nicht löschen, Bitte erst die Völker leeren')
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('delete-modal-location')
      })
    }
  }
}
</script>
