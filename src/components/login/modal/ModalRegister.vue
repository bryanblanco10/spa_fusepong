<template>
  <b-modal
    id="modal-register"
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-footer
  >
    <template v-slot:modal-header="{ close }">
      <h5>Registro</h5>
      <button class="btn btn__close waves" @click="close()">
        <i class="fas fa-times"></i>
      </button>
    </template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <form @submit.prevent="register">
            <div class="row mb-4">
              <div class="col-lg-6 col-md-6 col-12 mb-2">
                <div
                  class="form__group"
                  id="group_names"
                  :class="namesErrors($v.user.names)"
                >
                  <label>Nombre completo</label>
                  <div class="form__group--input">
                    <input
                      type="text"
                      class="form__input"
                      v-model="$v.user.names.$model"
                      @blur="$v.user.names.$touch()"
                    />
                    <i class="form__validation--state fas fa-times-circle"> </i>
                  </div>
                  <small
                    class="form__error"
                    v-if="!submitted && !$v.user.names.required"
                  >
                    Campo requerido.
                  </small>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 mb-2">
                <div
                  class="form__group"
                  id="group_email"
                  :class="emailErrors($v.user.email)"
                >
                  <label>Email</label>
                  <div class="form__group--input">
                    <input
                      type="email"
                      class="form__input"
                      v-model="$v.user.email.$model"
                      @blur="$v.user.email.$touch()"
                    />
                    <i class="form__validation--state fas fa-times-circle"> </i>
                  </div>
                  <small
                    class="form__error"
                    v-if="!submitted && !$v.user.email.required"
                  >
                    Campo requerido.
                  </small>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 mb-2">
                <div
                  class="form__group"
                  id="group_password"
                  :class="passwordErrors($v.user.password)"
                >
                  <label>Contraseña</label>
                  <div class="form__group--input">
                    <input
                      type="password"
                      class="form__input"
                      v-model="$v.user.password.$model"
                      @blur="$v.user.password.$touch()"
                    />
                    <i class="form__validation--state fas fa-times-circle"> </i>
                  </div>
                  <small
                    class="form__error"
                    v-if="!submitted && !$v.user.password.required"
                  >
                    Campo requerido.
                  </small>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 mb-2">
                <div class="form__group">
                  <label>Compañia</label>
                  <div class="form__group--input">
                    <select
                      class="form__select"
                      v-model="$v.user.enterpriseUuid.$model"
                      @blur="$v.user.enterpriseUuid.$touch()"
                    >
                      <option value="">Seleccione</option>
                      <option
                        v-for="(item, index) in enterprises"
                        :key="index"
                        :value="item.uuid"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <small
                    class="form__error2"
                    v-if="!submitted && $v.user.enterpriseUuid.$error"
                  >
                    Campo requerido.
                  </small>
                </div>
              </div>
            </div>
            <div class="row justify-content-center mb-4">
              <div class="col-6">
                <button type="submit" class="btn btn__guardar btn-block waves">
                  <span
                    :class="{
                      'spinner-border spinner-border-sm mb-1 mr-2 spinnerMas':
                        success,
                    }"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Registrar
                </button>
              </div>
            </div>
          </form>
          <div class="panel__msg--error" v-if="statusMsgError">
            <small class="msg__error ml-2 mt-1">{{ smsError }}</small>
            <button class="btn btn__close--panel" @click="closedPanel">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { enterpriseService, authService } from "@/services";
import Swal from 'sweetalert2'
export default {
  name: "ModalRegister",

  data() {
    return {
      submitted: false,
      success: false,
      user: {
        names: "",
        email: "",
        password: "",
        enterpriseUuid: "",
      },
      enterprises: [],
      statusMsgError: false,
      smsError: ""  
    };
  },

  validations: {
    user: {
      names: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      enterpriseUuid: {
        required,
      },
    },
  },

  methods: {
    updateStyles(validacion, campo) {
      if (validacion.$dirty) {
        document.getElementById(`group_${campo}`).classList.remove("correcto");
        document.getElementById(`group_${campo}`).classList.add("incorrecto");
        document
          .querySelector(`#group_${campo} .form__validation--state`)
          .classList.remove("fa-check-circle");
        document
          .querySelector(`#group_${campo} .form__validation--state`)
          .classList.add("fa-times-circle");
      }
      if (!validacion.$invalid) {
        document
          .getElementById(`group_${campo}`)
          .classList.remove("incorrecto");
        document.getElementById(`group_${campo}`).classList.add("correcto");
        document
          .querySelector(`#group_${campo} .form__validation--state`)
          .classList.remove("fa-times-circle");
        document
          .querySelector(`#group_${campo} .form__validation--state`)
          .classList.add("fa-check-circle");
      }
    },
    namesErrors() {
      this.updateStyles(this.$v.user.names, "names");
    },
    emailErrors() {
      this.updateStyles(this.$v.user.email, "email");
    },
    passwordErrors() {
      this.updateStyles(this.$v.user.password, "password");
    },
    async register(){
      const me = this;
      me.submitted = true;
        // Metodo de libreria vuelidate
        me.$v.$touch();
        if(me.$v.$invalid){
          me.submitted = false;
        }else{
          try {
            me.success = true;

            await authService.register(me.user);
            me.success = false;
            me.$root.$emit("bv::hide::modal", "modal-register");
            me.resetForm();
            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });
            Toast.fire({
              icon: 'success',
              title: 'Usuario registrado con exito',
            });
            
          } catch (error) {
            me.success = false;
            if(error.data.status === 422){
              me.statusMsgError = true
              me.smsError = 'Email se encuentra registrado.'
            }
          }
          

        }
    },
    closedPanel(){
      const me = this;
      me.statusMsgError = false;
    },
    resetForm(){
      const me = this;
      me.names = "";
      me.email = "";
      me.password = "";
      me.enterpriseUuid = "";
      me.submitted = false
      me.$v.user.$reset()
    },
  },

  async mounted() {
    const me = this;

    let res = await enterpriseService.get();
    me.enterprises = res.data;
  }
};
</script>

<style>
</style>