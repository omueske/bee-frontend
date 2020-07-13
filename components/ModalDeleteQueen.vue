<template
  ><b-modal
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
  </b-modal></template
>
