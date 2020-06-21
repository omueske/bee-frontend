<template>
  <b-row>
    <b-col>
      <b-button v-b-modal="'add-modal-loc'" pill variant="outline-secondary">
        Neuer Standort
      </b-button>

      <b-modal
        :id="'add-modal-loc'"
        ref="modal"
        title="Neuen Standort anlegen"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="locForm">
          <b-form-group
            id="name"
            :state="stateLocName"
            label="Standort Name"
            label-for="name"
            invalid-feedback="Standortname wird benötigt"
          >
            <b-form-input
              id="name"
              :state="stateLocName"
              :value="location.name"
              required
              @input="updateField('name', $event)"
            />
          </b-form-group>
          <b-form-group id="adress" label="Adresse" label-for="adress">
            <b-form-input
              id="adress"
              :value="location.adress"
              @input="updateField('adress', $event)"
            />
          </b-form-group>
          <b-form-group
            id="locCoords"
            label="Koordinaten"
            label-for="locCoords"
          >
            Breitenrad
            <b-form-input
              id="latitude"
              :value="location.lat"
              @input="updateField('lat', $event)"
            />
            Längengrad
            <b-form-input
              id="longitude"
              :value="location.lon"
              @input="updateField('lon', $event)"
            />
          </b-form-group>
          <b-form-group id="comment" label="Kommentar" label-for="comment">
            <b-form-input
              id="comment"
              :value="location.comment"
              @input="updateField('comment', $event)"
            />
          </b-form-group>
        </form>
      </b-modal> </b-col
    ><b-col><br /><br /></b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      location: {
        name: '',
        adress: '',
        lon: '',
        lat: '',
        comment: ''
      },
      stateLocName: null
    }
  },

  methods: {
    ...mapActions('locations', ['addLocation']),

    checkFormValidity() {
      const valid = this.$refs.locForm.checkValidity()
      console.log('valid: ' + valid)
      this.stateLocName = valid
      return valid
    },
    resetModal() {
      this.stateLocName = null
    },
    handleOk(event) {
      console.log('Event Called')
      console.table(event)
      // Prevent modal from closing
      event.preventDefault()
      // Exit when the form isn't valid

      if (!this.checkFormValidity()) {
        console.log('!valid')
        return
      }
      // Dispatch to API
      console.log('Loc: ' + this.location)
      this.addLocation(this.location)
      // unset values to avoid vuex state manipulation errors
      this.location = {
        name: '',
        adress: '',
        lon: '',
        lat: '',
        comment: ''
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('add-modal-loc')
      })
    },
    updateField(field, value) {
      this.location[field] = value
    }
  }
}
</script>
