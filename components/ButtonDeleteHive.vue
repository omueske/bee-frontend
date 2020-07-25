<template>
  <b-row
    ><b-col>
      <b-button
        v-b-modal="'modal-delete-hive-' + hiveid"
        variant="outline-secondary"
      >
        <b-icon-trash />
      </b-button>
      <b-modal
        :id="'modal-delete-hive-' + hiveid"
        ref="modal"
        title="Soll das Volk wirklich gelöscht werden?"
        @show="resetModal"
        @ok="handleOk"
      >
        Hive: {{ hiveid }}
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button size="sm" variant="danger" @click="ok()">
            Löschen
          </b-button>
          <b-button size="sm" variant="success" @click="cancel()">
            Abbrechen
          </b-button>
        </template>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    hiveid: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      locationList: (state) => state.locations.locationsList,
      hivesList: (state) => state.hives.hivesList
    })
  },

  methods: {
    ...mapActions('locations', ['deleteHiveFromLocation']),
    ...mapActions('hives', ['deleteHive']),

    resetModal() {
      this.stateLocName = null
    },
    handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      console.log(this.hiveid)
      this.deleteHiveFromLocation(this.hiveid)
      this.deleteHive(this.hiveid)

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-delete-hive-' + this.hiveid)
      })
    }
  }
}
</script>
