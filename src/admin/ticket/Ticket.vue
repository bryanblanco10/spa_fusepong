<template>
  <div class="container container__modules">
    <div class="row mb-3">
      <div class="col-12">
        <div class="title__section text-center">Tickets</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-2 col-6 mb-3">
        <button class="btn btn__new waves block" v-b-modal.modal-form-create>
          <div class="btn__content">
            <i class="fas fa-plus-square icono__btn--new mr-2"></i>
            <div class="text__btn--new">Nueva ticket</div>
          </div>
        </button>
      </div>
    </div>
    <div class="row mt-1 justify-content-center mb-4">
      <div class="col-lg-10 col-md-10 col-12 text-center">
        <div class="card card__panel p-3">
          <div class="table-responsive">
            <table class="table table-responsive table-sm">
              <thead>
                <tr class="text-center">
                  <th class="table__encabezado">Comentario</th>
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
                  <template v-if="tickets.length == 0">
                    <tr>
                      <td colspan="4">
                        <div class="title__section text-center mt-3">
                          No hay tickets para mostrar.
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr
                      class="table__contenido"
                      v-for="(item, index) in tickets"
                      :key="index"
                    >
                      <td>{{ item.commentary }}</td>
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
     <ModalRegister :handlePostSubmit="handlePostSubmit" :uuid="uuidUserHistory" />
    <ModalUpdate :record="selectedRow" :handlePostSubmit="handlePostSubmit" />
    <delete-record-modal />
  </div>
</template>

<script>
import { tickerService } from "@/services";
import ModalRegister from "./ModalFormTicket";
import ModalUpdate from "./ModalFormUpdateTicket";
import DeleteRecordModal from "@/components/base/DeleteRecordModal";
export default {
  name: "Ticket",

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
      tickets: [],
      isActive: false,
      isLoadingDeletion: false,
      selectedRow: null,
      uuid: null,
      repository: tickerService,
      uuidUserHistory: this.$route.params.userHistoryUuid,
    }
  },

  methods: {
    async loadTickets() {
      const me = this;
      try {
        me.isActive = true;

        let res = await tickerService.get(me.uuidUserHistory);

        me.isActive = false;
        me.tickets = res.data;
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
    
    handlePostSubmit() {
      this.loadTickets();
    }
  },

  created(){
    const me = this;
    
    me.loadTickets();
  }
}
</script>

<style>

</style>