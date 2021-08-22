<template>
  <b-modal
      id="modal-delete"
      centered
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      size="sm"
  >
    <template v-slot:modal-header>
      <h5>Eliminando...</h5>
    </template>
    <div class="container d-flex justify-content-center align-content-center mb-3 mt-1">
      <img src="@/assets/images/loading.gif" alt="fusepong">
    </div>
  </b-modal>
</template>
<script>
  export default{
  }
</script>