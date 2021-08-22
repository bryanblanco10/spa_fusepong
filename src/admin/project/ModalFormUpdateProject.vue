<template>
  <base-modal-form
    :title="title"
    :id="id"
    ref="modalform"
    @postSubmit="handlePostSubmit"
  >
    <template v-slot:formfields>
      <div class="col-12 mb-2">
        <div class="form__group">
          <label>Nombre</label>
          <div class="form__group--input">
            <input
              type="text"
              class="form__input--email"
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
      <div class="col-12 mb-2">
        <div class="form__group">
          <label>Descripción</label>
          <div class="form__group--input">
            <textarea 
              class="textarea__ p-1  ml-2" 
              rows="5"
              v-model="$v.formFields.description.$model"
            >
            </textarea>
          </div>
          <small
            class="form__error d-block"
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
      title: "Actualizar proyecto",
      repository: projectService,
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
      description: {
        required,
      }
    },
  },

  methods: {},

  async mounted() {},
};
</script>

<style>
</style>