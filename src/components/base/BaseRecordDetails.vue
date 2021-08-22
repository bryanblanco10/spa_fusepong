<template>
  <b-modal
    id="modal-record-details"
    title="Detalle"
    body-class="position-static"
  >
    <slot name="recorddetails" v-bind="row"></slot>
    <template #modal-footer="{ cancel }">
      <b-button size="sm" variant="outline-inverse" @click="cancel()">
        Cancelar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["row"]
};
</script>
