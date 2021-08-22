<template>
  <div class="container container__login">
      <div class="login__content">
        <h2 class="title__login">Inicio de sesión</h2>
        <div 
          class="panel__msg--error"
          v-if="statusMsgError"
        >
          <small class="msg__error mt-1">{{msgError}}</small>
          <button class="btn btn__close--panel" @click="closedPanel">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="login">
          <div
            id="email" 
            :class="emailErrors($v.user.email)"
          >
            <div class="input__field">
              <span class="icono__input">
                <i class="fas fa-envelope"></i>
              </span>
              <input 
                type="email" 
                placeholder="Correo electronico"
                v-model="$v.user.email.$model"
                @blur="$v.user.email.$touch()" 
              />
            </div>
            <small 
              class="error__formulario"
              v-if="!submitted && !$v.user.email.required"
            >
                Campo requerido.
            </small>
            <small 
              class="error__formulario"
              v-if="!submitted && !$v.user.email.email"
            >
              Ingrese una dirección de correo válida.
            </small>
          </div>
          <div
            id="password" 
            :class="passwordErrors($v.user.password)"
          >
            <div class="input__field">
              <span class="icono__input">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                type="password" 
                placeholder="Contraseña"
                v-model="$v.user.password.$model"
                @blur="$v.user.password.$touch()"
              />
            </div>
            <small 
              class="error__formulario"
              v-if="!submitted && !$v.user.password.required"
            >
                Campo requerido.
            </small>
          </div>
          <div class="olvidar__password">
            <a v-b-modal.modal-ask-code class="a__login">¿Olvidaste tú contraseña?</a>
          </div>
          <button type="submit" class="btn btn__ingresar waves btn-block mb-4 mt-1">
            Ingresar
            <span
              :class="{'spinner-border spinner-border-sm  mr-2 spinnerMas': success}"
              role="status"
              aria-hidden="true"
              ></span>
          </button>
          <p class="text__registrate">
            ¿No tienes cuenta?
          </p>
        </form>
        <button
          class="register"
          v-b-modal.modal-register
        >
          Registrate ahora
        </button>
      </div>
      
      <ModalRegister />
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { authService } from "@/services";
import ModalRegister from "./modal/ModalRegister";
export default {
  name: "Login",

  data(){
    return {
      user: {
        email: "",
        password: ""
      },
      success: false,
      statusMsgError: false,
      msgError: "",
      submitted: false
    }
  },

  components: {
    ModalRegister
  },

  validations:{
    user:{
      email:{
        required,
        email
      },
      password:{
        required
      }
    }
  },

  methods: {
    emailErrors(){
      this.updateStyles(this.$v.user.email, 'email')
    },
    passwordErrors(){
      this.updateStyles(this.$v.user.password, 'password')
    },
    updateStyles(validacion,campo1){
      if(validacion.$dirty){
        document.getElementById(`${campo1}`).classList.remove('correcto');
        document.getElementById(`${campo1}`).classList.add('incorrecto');
      }
      if(!validacion.$invalid){
        document.getElementById(`${campo1}`).classList.remove('correcto');
        document.getElementById(`${campo1}`).classList.add('incorrecto');
      }
    },
    async login(){
      const me = this;
      me.submitted = true
        // Metodo de libreria vuelidate
        me.$v.$touch();
        if(me.$v.$invalid){
          me.submitted = false
        }else{
          try{
            me.success = true;
            let res = await authService.login(me.user);
            me.success = false;

            const { user } = res.data;
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("authenticated", true);
            this.$router.push(process.env.VUE_APP_HOME_ROUTE);
            
          }catch(err){
            me.success = false;
            if(err.data.status === 422){
              me.statusMsgError = true
              me.msgError = "Email ó Contraseña incorrectos."
            }
          }
        }
    },
    closedPanel(){
      const me = this;
      me.statusMsgError = false;
    }
  }
}
</script>

<style>
  @import './login.css';
</style>