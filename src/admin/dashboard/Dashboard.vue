<template>
  <div class="container mb-4">
    <div class="row">
      <div class="col-12 text-center">
        <h6 class="welcome">
          ¡Bienvenido(a), <strong>{{ user.names }}</strong
          >!
        </h6>
      </div>
      <div class="col-12 logo__fusepong text-center">
        <img src="@/assets/images/fusepong.jpg" alt="fusepong" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data(){
    return {
      user: {}
    }
  },

  created(){
    const me = this;
    if(localStorage.getItem("user"))
      me.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>

<style>
  @import "./dashboard.css";
</style>