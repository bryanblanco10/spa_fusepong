import Swal from 'sweetalert2';

const moduleActions = {};

const customComponentActions = {
  methods: {
    validationForm(validation, field) {
      if (validation.$dirty) {
        document.getElementById(`group_${field}`).classList.remove("correcto");
        document.getElementById(`group_${field}`).classList.add("incorrecto");
        document
          .querySelector(`#group_${field} .form__validation--state`)
          .classList.remove("fa-check-circle");
        document
          .querySelector(`#group_${field} .form__validation--state`)
          .classList.add("fa-times-circle");
      }
      if (!validation.$invalid) {
        document
          .getElementById(`group_${field}`)
          .classList.remove("incorrecto");
        document.getElementById(`group_${field}`).classList.add("correcto");
        document
          .querySelector(`#group_${field} .form__validation--state`)
          .classList.remove("fa-times-circle");
        document
          .querySelector(`#group_${field} .form__validation--state`)
          .classList.add("fa-check-circle");
      }
    }
  }
};

const formActions = {
  methods: {
    async submit() {
      const me = this;
      const module = me.$parent;

      module.$v.$touch();

      if (!module.$v.$invalid) {
        let data = module.formFields

        me.isLoading = true;

        if (!data.uuid) {
          try {
            await module.repository.save(data);
            module.$v.formFields.$reset()
            module.formFields = { ...me.bkFormFiles };
            this.$emit("postSubmit");
            me.handleSuccess();
          } catch (error) {
            me.handleFailure(error.data.message)
          }
        } else {
          try {
            await module.repository.update(data.uuid, data);
            module.$v.formFields.$reset();
            this.$emit("postSubmit");
            me.handleSuccess();
          } catch (error) {
            me.handleFailure(error.data.message)
          }
        }
      }
    },

    handleSuccess() {
      const me = this;
      me.isLoading = false;
      me.$root.$emit("bv::hide::modal", "modal-form-create");
      me.$root.$emit("bv::hide::modal", "modal-form-update");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: 'success',
        title: 'Registro guardado con exito',
      });
    },

    handleFailure(message) {
      const me = this;

      me.isLoading = false;
      me.statusMsgError = true;
      me.smsError = message;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: 'error',
        title: 'Ocurrio un error',
      });
    }
  }
};

export {
  moduleActions,
  customComponentActions,
  formActions
};