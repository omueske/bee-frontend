<template>
  <div>
    <b-button @click="FormHiveInfoisVisible = !FormHiveInfoisVisible"
      >Formular ein/ausblenden</b-button
    >
    <h1 v-if="FormHiveInfoisVisible">Übersicht {{ selectedHive.name }}</h1>
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
