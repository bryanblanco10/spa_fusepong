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
          <label>Descripción</label>
          <div class="form__group--input">
            <textarea
              class="textarea__ p-1 ml-2"
              rows="5"
              v-model="$v.formFields.commentary.$model"
            >
            </textarea>
          </div>
          <small
            class="form__error d-block"
            v-if="!submitted && !$v.formFields.commentary.required"
          >
            Campo requerido.
          </small>
        </div>
      </div>
      <div class="col-12">
        <div class="form__group">
          <label>Estado</label>
          <div class="form__group--input">
            <b-form-radio-group class="pl-2" v-model="formFields.status">
              <b-form-radio
                class="radio__"
                value="Activo"
              >
                Activo
              </b-form-radio>
              <b-form-radio
                class="radio__"
                value="En Proceso"
              >
                En Proceso
              </b-form-radio>
              <b-form-radio
                class="radio__"
                value="Finalizado"
              >
                Finalizado
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </div>
      </div>
    </template>
  </base-modal-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { tickerService } from "@/services";
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
      title: "Actualizar ticket",
      repository: tickerService,
      id: "modal-form-update",
    };
  },

  watch: {
    record(newRecord) {
      this.formFields = Object.assign({}, newRecord);
    },
  },

  validations: {
    formFields: {
      commentary: {
        required,
      },
    },
  },

  methods: {},

  async mounted() {},
};
</script>

<style>
</style>