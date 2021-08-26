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
          id="group_commentary"
          :class="validationForm($v.formFields.commentary, field.commentary)"
        >
          <label>Comentario</label>
          <div class="form__group--input">
            <textarea 
              class="textarea__ p-1  ml-2" 
              rows="5"
              v-model="$v.formFields.commentary.$model"
              @blur="$v.formFields.commentary.$touch()"
            >
            </textarea>
            <i class="form__validation--state fas fa-times-circle"> </i>
          </div>
          <small
            class="form__error"
            v-if="!submitted && !$v.formFields.commentary.required"
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
import { tickerService } from "@/services";
import { customComponentActions } from "@/mixins/actions";
import BaseModalForm from "@/components/base/BaseModalForm";
export default {
  name: "ModalRegister",

  props: ["handlePostSubmit", "uuid"],

  mixins: [customComponentActions],

  components: {
    BaseModalForm,
  },

  data() {
    return {
      submitted: false,
      success: false,
      formFields: {
        commentary: "",
        userHistoryUuid: this.uuid
      },
      field: {
        commentary: "commentary"
      },
      statusMsgError: false,
      smsError: "",
      title: "Crear Ticket",
      id: "modal-form-create",
      repository: tickerService,
    };
  },

  validations: {
    formFields: {
      commentary: {
        required,
      },
    },
  },

  methods: {
    postSubmit() {
      this.$emit("postSubmit");
    },
  },
};
</script>

<style>
</style>