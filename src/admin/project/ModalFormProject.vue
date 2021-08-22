<template>
  <base-modal-form
    :title="title"
    :id="id"
    ref="modalform"
    @postSubmit="handlePostSubmit"
  >
    <template v-slot:formfields>
      <div class="col-12 mb-2">
        <div
          class="form__group"
          id="group_name"
          :class="validationForm($v.formFields.name, field.name)"
        >
          <label>Nombre</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input--email"
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
      <div class="col-12 mb-2">
        <div
          class="form__group"
          id="group_description"
          :class="validationForm($v.formFields.description, field.description)"
        >
          <label>Descripción</label>
          <div class="form__group--input">
            <textarea 
              class="textarea__ p-1  ml-2" 
              rows="5"
              v-model="$v.formFields.description.$model"
              @blur="$v.formFields.description.$touch()"
            >
            </textarea>
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.description.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
    </template>
  </base-modal-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { projectService } from "@/services";
import { customComponentActions } from "@/mixins/actions";
import BaseModalForm from "@/components/base/BaseModalForm";
export default {
  name: "ModalRegister",

  props: ["handlePostSubmit", "uuidUser"],

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
        description: "",
        userUuid: "",
      },
      field: {
        name: "name",
        description: "description"
      },
      statusMsgError: false,
      smsError: "",
      title: "Crear proyecto",
      id: "modal-form-create",
      repository: projectService,
    };
  },

  validations: {
    formFields: {
      name: {
        required,
      },
      description: {
        required,
      },
    },
  },

  methods: {
    postSubmit() {
      this.$emit("postSubmit");
    },
  },

  async mounted() {
    const me = this;
    me.formFields.userUuid = me.uuidUser;
  },
};
</script>

<style>
</style>