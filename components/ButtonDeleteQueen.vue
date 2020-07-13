<template>
  <div>
    <b-button
      v-b-modal="'modal-delete-queen-' + queenid"
      variant="outline-secondary"
      pill
      size="sm"
    >
      <b-icon-trash />
    </b-button>
    <b-modal
      :id="'modal-delete-queen-' + queenid"
      ref="modal"
      title="Soll die Königin wirklich gelöscht werden?"
      @show="resetModal"
      @ok="handleOk"
    >
      Königin id: {{ queenid }}
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="danger" @click="ok()">
          Löschen
        </b-button>
        <b-button size="sm" variant="success" @click="cancel()">
          Abbrechen
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  props: {
    queenid: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      queen: (state) => state.queens.queenList
    })
  },

  methods: {
    ...mapActions('hives', ['unLinkQueenFromHive']),
    ...mapActions('queens', ['deleteQueen']),
    ...mapGetters('hives', ['getHiveByQueenId']),

    resetModal() {
      this.stateLocName = null
    },
    handleOk(event) {
      // Prevent modal from closing
      event.preventDefault()

      // console.log(this.queenid)
      // this.unLinkQueenFromHive(this.queenid)
      this.deleteQueen(this.queenid)
        .then(() => this.unLinkQueenFromHive(this.queenid))
        .catch((err) => {
          console.log('API-ERROR:' + err)
        })

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-delete-queen-' + this.queenid)
      })
    }
  }
}
</script>
