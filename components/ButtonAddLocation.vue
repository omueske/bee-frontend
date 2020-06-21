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
              @input="updateField('name', $event)"
              required
            />
            {{ location.name }}
          </b-form-group>
          <b-form-group id="locAddress" label="Adresse" label-for="locAdress">
            <b-form-input id="locAdress" :value="location.adress" />
          </b-form-group>
          <b-form-group
            id="locCoords"
            label="Koordinaten"
            label-for="locCoords"
          >
            Breitenrad
            <b-form-input
              id="locCoordsLat"
              :value="location.latitute"
              @input="updateField('locCoordsLat', $event)"
            />
            Längengrad
            <b-form-input
              id="locCoordsLan"
              :value="location.langitute"
              @input="updateField('locCoordsLan', $event)"
            />
          </b-form-group>
          <b-form-group
            id="locComment"
            label="Kommentar"
            label-for="locComment"
          >
            <b-form-input
              id="locComment"
              :value="location.comment"
              @input="updateField('locComment', $event)"
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
        longitudee: '',
        latitute: '',
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
        longitudee: '',
        latitute: '',
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
