<template>
  <b-row>
    <b-col>
      <b-button-group size="sm">
        <ButtonDeleteQueen :queenid="this.queenid" />
        <ButtonModifyQueen :queenid="this.queenid" />
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import ButtonDeleteQueen from '@/components/ButtonDeleteQueen'
import ButtonModifyQueen from '@/components/ButtonModifyQueen'

export default {
  components: {
    ButtonDeleteQueen,
    ButtonModifyQueen
  },
  props: {
    queenid: {
      type: String,
      required: true
    }
  }
}
</script>
