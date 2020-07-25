<template>
  <div>
    <h1>Übersicht {{ selectedHive.name }}</h1>
    <b-button @click="FormHiveInfoisVisible = !FormHiveInfoisVisible"
      >Formular ein/ausblenden</b-button
    >
    <FormHiveInfo v-if="FormHiveInfoisVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormHiveInfo from '@/components/FormHiveInfo'

export default {
  components: {
    FormHiveInfo
  },
  data: () => ({
    FormHiveInfoisVisible: true
  }),

  computed: {
    ...mapState({
      selectedHive: (state) => state.hives.selectedHive
    })
  }
}
</script>
