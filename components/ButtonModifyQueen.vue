<template>
  <div>
    <b-button
      v-b-modal.ModalModifyQueen
      variant="outline-secondary"
      pill
      size="sm"
      @click="setSelectedQueen(queenid)"
    >
      <b-icon-gear />
    </b-button>
    <ModalModifyQueen />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalModifyQueen from '@/components/ModalModifyQueen'
export default {
  components: {
    ModalModifyQueen
  },
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
    ...mapActions('queens', ['setSelectedQueen'])
  }
}
</script>
