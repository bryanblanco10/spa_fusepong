<template>
  <section class="sideBar scroll__menu--admin open-menu">
    <div class="sideBar-ct">
      <!-- sideBar-title -->
      <div class="text-center text-uppercase sideBar-title">
        <button class="btn__closed--menu" @click="btnClosed">
          <i class="fas fa-times"></i>
        </button>
        <router-link to="/app">Fusepong</router-link>
      </div>
      <!-- SideBar - User info -->
      <div class="sideBar-UserInfo">
        <h4 class="text-center">{{ user.names }}</h4>
        <ul>
          <li>
            <a @click="logout">
              <i class="fas fa-power-off"></i>
              Salir
            </a>
          </li>
        </ul>
      </div>
      <!-- SideBar - Menu -->
      <div class="title__menu text-center">Menú</div>
      <div class="sideBar-menu">
        <div class="item__menu" @click="btnClosed">
          <router-link to="/app">
            <i class="fas fa-home icono__menu"></i>
            <span class="title__item">Home</span>
          </router-link>
        </div>
        <div class="item__menu" @click="btnClosed">
          <router-link to="/project">
            <i class="fas fa-folder-open icono__menu"></i>
            <span class="title__item">Proyectos</span>
          </router-link>
        </div>
        <div class="item__menu" @click="btnClosed">
          <router-link to="/enterprise">
            <i class="fas fa-building icono__menu"></i>
            <span class="title__item">Compañías</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { actionLayout } from "@/mixins/layout";
export default {
  name: "Sidebar",

  mixins: [actionLayout],

  data(){
    return {
      user: {}
    }
  },

  methods: {
    logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("authenticated");

      this.$router.push("/login");
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
@import "./sidebar.css";
</style>