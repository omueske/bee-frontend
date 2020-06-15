<template>
  <div class="div-box">H: {{ hiveid }}</div>
</template>

<script>
export default {
  props: {
    hiveid: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.div-box {
  /* width: 49%; */
  border: 1px solid black;
  padding: 10px;
}
</style>
