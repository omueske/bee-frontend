<template>
  <b-row>
    <b-col>
      <b-button-group size="sm">
        <b-button variant="outline-secondary" @click="setSelectedHive(hiveid)">
          <b-icon-eye />
        </b-button>
        <b-button variant="outline-secondary">
          <b-icon-gear />
        </b-button>
        <ButtonDeleteHive :hiveid="hiveid" />
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import ButtonDeleteHive from '@/components/ButtonDeleteHive'

export default {
  components: {
    ButtonDeleteHive
  },

  props: {
    hiveid: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('hives', ['setSelectedHive'])
  }
}
</script>
