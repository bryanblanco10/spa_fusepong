<template>
  <div class="container container__modules">
    <div class="row mb-3">
      <div class="col-12">
        <div class="title__section text-center">Compañias</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-2 col-6 mb-3">
        <button class="btn btn__new waves block" v-b-modal.modal-form-create>
          <div class="btn__content">
            <i class="fas fa-plus-square icono__btn--new mr-2"></i>
            <div class="text__btn--new">Nueva compañía</div>
          </div>
        </button>
      </div>
    </div>
    <div class="row mt-1 justify-content-center mb-4">
      <div class="col-lg-10 col-md-10 col-12 text-center">
        <div class="card card__panel p-3">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr class="text-center">
                  <th class="table__encabezado">NIT</th>
                  <th class="table__encabezado">Nombre</th>
                  <th class="table__encabezado">Email</th>
                  <th class="table__encabezado">Teléfono</th>
                  <th class="table__encabezado">Dirección</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="isActive">
                  <tr v-for="(item, index) in fakes" :key="index">
                    <td colspan="4">
                      <div
                        class="fake-td"
                        :class="{ 'placeholder-loading': isActive }"
                      ></div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <template v-if="enterprises.length == 0">
                    <tr>
                      <td colspan="4">
                        <div class="title__section text-center mt-3">
                          No hay compañias para mostrar.
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr
                      class="table__contenido"
                      v-for="(item, index) in enterprises"
                      :key="index"
                    >
                      <td>{{ item.nit }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.phone }}</td>
                      <td>{{ item.address }}</td>
                      <td>
                        <div class="d-inline-flex">
                          <button
                            class="btn__action waves"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Editar"
                            @click="setSelectedRow(item)"
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            class="btn__action waves ml-3"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Eliminar"
                            @click="handleDelete(item.uuid)"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ModalRegister :handlePostSubmit="handlePostSubmit" />
    <ModalUpdate :record="selectedRow" :handlePostSubmit="handlePostSubmit" />
    <delete-record-modal />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { enterpriseService } from "@/services";
import ModalRegister from "./ModalFormEnterprise";
import ModalUpdate from "./ModalFormUpdateEnterprise";
import DeleteRecordModal from "@/components/base/DeleteRecordModal";
export default {
  name: "Enterprise",

  components: {
    ModalRegister,
    ModalUpdate,
    DeleteRecordModal,
  },

  data() {
    return {
      fakes: [
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
        {
          fade: "",
        },
      ],
      enterprises: [],
      isActive: false,
      isLoadingDeletion: false,
      selectedRow: null,
      uuid: null,
      repository: enterpriseService,
    };
  },

  methods: {
    async loadEnterprises() {
      const me = this;
      try {
        me.isActive = true;

        let res = await enterpriseService.get();

        me.isActive = false;
        me.enterprises = res.data;
      } catch (error) {
        me.isActive = true;
        console.log(error);
      }
    },

    setSelectedRow(row) {
      const me = this;

      me.selectedRow = row;
      me.$root.$emit("bv::show::modal", "modal-form-update");
    },

    handleDelete(uuid) {
      Swal.fire({
        title: "¿Realmente deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#09ca6c",
        cancelButtonColor: "#1f69e1",
        cancelButtonText: "No",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteRecord(uuid);
        }
      });
    },

    async deleteRecord(uuid) {
      const me = this;
      me.$root.$emit("bv::show::modal", "modal-delete");

      try {
        await me.repository.delete(uuid);
        me.loadEnterprises();
        me.$root.$emit("bv::hide::modal", "modal-delete");
      } catch (error) {
        me.$root.$emit("bv::hide::modal", "modal-delete");
        console.log(error);
      }
    },

    handlePostSubmit() {
      this.loadEnterprises();
    },
  },

  mounted() {
    const me = this;
    me.loadEnterprises();
  },
};
</script>

<style>
</style>