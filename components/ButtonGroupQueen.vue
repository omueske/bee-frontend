<template>
  <b-row>
    <b-col>
      <b-button-group size="sm">
        <ButtonMoveQueen :queenid="queenid" />
        <ButtonModifyQueen :queenid="queenid" />
        <ButtonDeleteQueen :queenid="queenid" />
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import ButtonDeleteQueen from '@/components/ButtonDeleteQueen'
import ButtonModifyQueen from '@/components/ButtonModifyQueen'
import ButtonMoveQueen from '@/components/ButtonMoveQueen'

export default {
  components: {
    ButtonDeleteQueen,
    ButtonModifyQueen,
    ButtonMoveQueen
  },
  props: {
    queenid: {
      type: String,
      required: true
    }
  }
}
</script>
