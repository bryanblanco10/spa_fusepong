<template>
  <base-modal-form
    :title="title"
    :id="id"
    ref="modalform"
    @postSubmit="handlePostSubmit"
  >
    <template v-slot:formfields>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div class="form__group">
          <label>Nombre</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input"
              v-model="$v.formFields.name.$model"
            />
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.name.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div class="form__group">
          <label>NIT</label>
          <div class="form__group--input">
            <input
              type="number"
              class="form__input"
              v-model="$v.formFields.nit.$model"
            />
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.nit.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div class="form__group">
          <label>Teléfono</label>
          <div class="form__group--input">
            <input
              type="number"
              class="form__input"
              v-model="$v.formFields.phone.$model"
            />
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.phone.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12 mb-2">
        <div class="form__group">
          <label>Dirección</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input"
              v-model="$v.formFields.address.$model"
            />
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.address.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="form__group">
          <label>Email</label>
          <div class="form__group--input">
            <input
              type="email"
              class="form__input--email"
              v-model="$v.formFields.email.$model"
            />
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.email.required"
          >
            Campo requerido.
          </small>
          <small
            class="form__error d-block"
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
import BaseModalForm from "@/components/base/BaseModalForm";
export default {
  name: "ModalUpdate",

  props: ["handlePostSubmit", "record"],

  components: {
    BaseModalForm,
  },

  data() {
    return {
      submitted: false,
      success: false,
      formFields: Object.assign({}, this.record),
      statusMsgError: false,
      smsError: "",
      title: "Actualizar compañia",
      repository: enterpriseService,
      id: "modal-form-update"
    };
  },

  watch: {
    record(newRecord) {
      this.formFields = Object.assign({}, newRecord);
    },
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

  methods: {},

  async mounted() {},
};
</script>

<style>
</style>