<template>
  <nav class="Navbar">
    <div class="header__container--admin">
      <div class="left__area">
        <button class="btn__bars--admin waves">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="right__area">
        <button class="user__profile--nav" >
          <i class="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
  @import "./header.css";
</style>