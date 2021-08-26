<template>
  <nav class="Navbar">
    <div class="header__container--admin">
      <div class="left__area">
        <button class="btn__bars--admin waves" @click="btnBars">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="right__area">
        <button class="user__profile--nav" >
          <img src="@/assets/images/user.png" alt="">
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { actionLayout } from "@/mixins/layout";
export default {
  name: "Header",

  mixins: [actionLayout]
};
</script>

<style>
  @import "./header.css";
</style>