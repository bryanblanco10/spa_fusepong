<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-12">
        <div class="title__section text-center">Historia de usuario</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-2 col-6 mb-3">
        <button class="btn btn__new waves block" v-b-modal.modal-form-create>
          <div class="btn__content">
            <i class="fas fa-plus-square icono__btn--new mr-2"></i>
            <div class="text__btn--new">Nueva historia</div>
          </div>
        </button>
      </div>
    </div>
    <div class="row mt-1 justify-content-center mb-4">
      <div class="col-10 text-center">
        <div class="card card__panel p-3">
          <table class="table table-responsive table-sm">
            <thead>
              <tr class="text-center">
                <th class="table__encabezado">Descripción</th>
                <th class="table__encabezado">Estado</th>
                <th class="table__encabezado">Acciones</th>
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
                <template v-if="userHistories.length == 0">
                  <tr>
                    <td colspan="4">
                      <div class="title__section text-center mt-3">
                        No hay proyectos para mostrar.
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr
                    class="table__contenido"
                    v-for="(item, index) in userHistories"
                    :key="index"
                  >
                    <td>{{ item.description }}</td>
                    <td>{{ item.status }}</td>
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
                        <router-link
                          class="btn__action waves ml-3"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Ticket"
                          :to="{name: 'ticket', params:{userHistoryUuid: item.uuid}}"
                        >
                          <i class="fas fa-clipboard-list"></i>
                        </router-link>
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
     <ModalRegister :handlePostSubmit="handlePostSubmit" :uuid="uuidProject" />
    <ModalUpdate :record="selectedRow" :handlePostSubmit="handlePostSubmit" />
    <delete-record-modal />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { userHistoryService } from "@/services";
import ModalRegister from "./ModalFormUserHistory";
import ModalUpdate from "./ModalFormUpdateUserHistory";
import DeleteRecordModal from "@/components/base/DeleteRecordModal";
export default {
  name: "UserHistory",

  components: {
    ModalRegister,
    ModalUpdate,
    DeleteRecordModal,
  },

  data(){
    return {
      user: {},
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
      userHistories: [],
      isActive: false,
      isLoadingDeletion: false,
      selectedRow: null,
      uuid: null,
      repository: userHistoryService,
      uuidProject: this.$route.params.projectUuid,
    }
  },

  methods: {
    async loadUserHistories() {
      const me = this;
      try {
        me.isActive = true;

        let res = await userHistoryService.get(me.uuidProject);

        me.isActive = false;
        me.userHistories = res.data;
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
      const data = { status: "Eliminado" };
      try {
        await me.repository.delete(uuid, data);
        me.handlePostSubmit();
        me.$root.$emit("bv::hide::modal", "modal-delete");
      } catch (error) {
        me.$root.$emit("bv::hide::modal", "modal-delete");
        console.log(error);
      }
    },

    handlePostSubmit() {
      this.loadUserHistories();
    },

  },

  created(){
    const me = this;
    me.loadUserHistories();
  }
}
</script>

<style>

</style>