<template>
  <b-modal
    :id="id"
    :size="size"
    :no-close-on-backdrop="true"
    hide-footer
    @postSubmit="post"
  >
    <template v-slot:modal-header="{ close }">
      <h5>{{title}}</h5>
      <button class="btn btn__close waves" @click="close()">
        <i class="fas fa-times"></i>
      </button>
    </template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit" ref="form">
            <div class="row mb-4">
              <slot name="formfields"></slot>
            </div>
            <div class="row justify-content-center mb-4">
              <div class="col-6">
                <button type="submit" class="btn btn__guardar btn-block waves">
                  <span
                    :class="{
                      'spinner-border spinner-border-sm mb-1 mr-2 spinnerMas':
                      isLoading,
                    }"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Guardar
                </button>
              </div>
            </div>
          </b-form>
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
import { formActions } from "@/mixins/actions.js";
export default {
  mixins: [formActions],
  props: {
    id: {
      type: String,
      default: "modal-form"
    },

    title: {
      type: String,
      default: ""
    },

    size: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isLoading: false,
      bkFormFiles: {},
      statusMsgError: false,
      smsError: ""
    };
  },

  methods: {
    post(){
      this.$emit("postSubmit");
    },
    closedPanel(){
      this.statusMsgError = false;
    }
  },

  mounted() {
    const me = this;
    me.bkFormFiles = { ...me.$parent.formFields };
  }
}
</script>

<style>

</style>