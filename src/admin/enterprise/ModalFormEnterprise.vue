<template>
  <base-modal-form
    :title="title"
    :id="id"
    ref="modalform"
    @postSubmit="handlePostSubmit"
  >
    <template v-slot:formfields>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div
          class="form__group"
          id="group_name"
          :class="validationForm($v.formFields.name, field.name)"
        >
          <label>Nombre</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input"
              v-model="$v.formFields.name.$model"
              @blur="$v.formFields.name.$touch()"
            />
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.name.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div
          class="form__group"
          id="group_nit"
          :class="validationForm($v.formFields.nit, field.nit)"
        >
          <label>NIT</label>
          <div class="form__group--input">
            <input
              type="number"
              class="form__input"
              v-model="$v.formFields.nit.$model"
              @blur="$v.formFields.nit.$touch()"
            />
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.nit.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div
          class="form__group"
          id="group_phone"
          :class="validationForm($v.formFields.phone, field.phone)"
        >
          <label>Teléfono</label>
          <div class="form__group--input">
            <input
              type="number"
              class="form__input"
              v-model="$v.formFields.phone.$model"
              @blur="$v.formFields.phone.$touch()"
            />
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.phone.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div
          class="form__group"
          id="group_address"
          :class="validationForm($v.formFields.address, field.address)"
        >
          <label>Dirección</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input"
              v-model="$v.formFields.address.$model"
              @blur="$v.formFields.address.$touch()"
            />
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.address.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div
          class="form__group"
          id="group_email"
          :class="validationForm($v.formFields.email, field.email)"
        >
          <label>Email</label>
          <div class="form__group--input">
            <input
              type="email"
              class="form__input--email"
              v-model="$v.formFields.email.$model"
              @blur="$v.formFields.email.$touch()"
            />
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.email.required"
          >
            Campo requerido.
          </small>
          <small 
              class="form__error"
              v-if="!submitted && !$v.formFields.email.email"
            >
              Ingrese una dirección de correo válida.
            </small>
        </div>
      </div>
    </template>
  </base-modal-form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { enterpriseService } from "@/services";
import { customComponentActions } from "@/mixins/actions";
import BaseModalForm from "@/components/base/BaseModalForm";
export default {
  name: "ModalRegister",

  props: ["handlePostSubmit", "record"],

  mixins: [customComponentActions],

  components: {
    BaseModalForm,
  },

  data() {
    return {
      submitted: false,
      success: false,
      formFields: {
        name: "",
        nit: "",
        phone: "",
        address: "",
        email: "",
      },
      field: {
        name: "name",
        nit: "nit",
        phone: "phone",
        address: "address",
        email: "email",
      },
      statusMsgError: false,
      smsError: "",
      title: "Crear compañia",
      id: "modal-form-create",
      repository: enterpriseService
    };
  },

  validations: {
    formFields: {
      name: {
        required,
      },
      nit: {
        required,
      },
      phone: {
        required,
      },
      address: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },

  methods: {
    postSubmit(){
      this.$emit("postSubmit");
    }
  },

  async mounted() {},
};
</script>

<style>
</style>