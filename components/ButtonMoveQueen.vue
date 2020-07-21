<template>
  <div>
    <b-button
      v-b-modal="'ModalMoveQueen-' + queenid"
      variant="outline-secondary"
      pill
      size="sm"
    >
      <b-icon-arrow-right-circle />
    </b-button>
    <ModalMoveQueen :queenid="queenid" />
  </div>
</template>

<script>
import ModalMoveQueen from '@/components/ModalMoveQueen'

export default {
  components: {
    ModalMoveQueen
  },
  props: {
    queenid: {
      type: String,
      required: true
    }
  }
}
</script>
