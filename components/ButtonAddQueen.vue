<template
  ><div>
    <b-button
      v-b-modal.ModalAddQueen
      pill
      variant="outline-secondary"
      size="sm"
    >
      Neue Königin anlegen
    </b-button>
    <ModalAddQueen />
  </div>
</template>

<script>
import ModalAddQueen from '@/components/ModalAddQueen'

export default {
  components: {
    ModalAddQueen
  }
}
</script>
