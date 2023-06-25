<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="text-right">
          <button
            @click="showAddLeadsourceForm = !showAddLeadsourceForm"
            class="btn btn-success btn-sm btn-lg"
            style="float: right"
          >
            Add LeadSource
          </button>
        </div>
      </div>
    </div>
    <!-- Alerts Html -->

    <soft-alert v-show="alertData.showSuccessMessage" color="success">
      <strong>{{ alertData.alertMessage }}</strong>
    </soft-alert>

    <soft-alert v-show="alertData.showErrorMessage" color="danger">
      <strong>{{ alertData.alertMessage }}</strong>
    </soft-alert>

    <div class="row">
      <div class="col-12">
        <LeadsourceAddForm
          @addleadsourceform="addleadsourceform"
          v-if="showAddLeadsourceForm"
        />
      </div>

      <div class="col-12">
        <LeadsourceTable
          @delete-lead-source="deleteleadSource"
          @open-edit-leadsource-form="openEditleadsourceForm"
          :leadsourcelist="leadsourcelist"
        />
      </div>
    </div>

    <LeadsourceEdit
      :leadsourceEditObj="leadsourceEditObj"
      @close-edit-model="closeEditModel"
      @editleadsourceform="editleadsourceform"
      v-if="showEditLeadsourceForm"
    >
    </LeadsourceEdit>

    <!-- <teleport to="#mymodal">
      <SoftModelInput></SoftModelInput>
    </teleport> -->

    <div class="row">
      <div class="col-12">
        <!-- <projects-table /> -->
      </div>
    </div>
  </div>
</template>

<script>
import LeadsourceTable from "./LeadsourceTable.vue";
import LeadsourceAddForm from "./LeadsourceAddForm.vue";
// import UserEditForm from "./components/Users/UserEditForm.vue";
import LeadsourceEdit from "./LeadsourceEdit.vue";
// import ProjectsTable from "./components/ProjectsTable";
// import SoftModelInput from "@/components/SoftModelInput.vue";
import { mapActions, mapGetters } from "vuex";
// import SoftAlert from "../components/SoftAlert.vue";

import SoftAlert from "../../../components/SoftAlert.vue";
export default {
  name: "tables",
  components: {
    LeadsourceTable,
    LeadsourceAddForm,
    SoftAlert,
    // UserEditForm,
    LeadsourceEdit,
    // ProjectsTable,
    // SoftModelInput,
  },
  data() {
    return {
      showEditModel: false,
      showAddLeadsourceForm: false,
      showEditLeadsourceForm: false,
      leadsourceEditObj: {},
    };
  },
  computed: {
    ...mapGetters("leadsource", [
      "leadsource",
      "getLeadsourceAll",
      "getLeadsourceByID",
    ]),

    ...mapGetters("leadsource", ["getalertData"]),
    alertData() {
      return this.getalertData;
    },

    leadsourcelist() {
      return this.getLeadsourceAll;
    },
  },
  mounted: function () {
    this.fetchLeadsourceAll();
  },

  methods: {
    ...mapActions("leadsource", [
      "fetchLeadsourceAll",
      "addLeadSource",
      "deleteLeadSource",
      "resetAlertData",
      "updateLeadsource",
    ]),
    showAlerts() {
      setTimeout(() => {
        this.resetAlertData();
      }, 2000);
    },
    async addleadsourceform(payload) {
      this.addLeadSource(payload);
      // this.fetchLeadsourceAll();
      this.showAlerts();
    },
    async editleadsourceform(payload) {
      payload.leadsourceid = payload.leadsourceid.toString();
      this.updateLeadsource(payload);
      // this.fetchLeadsourceAll();
      this.showAlerts();
    },
    openEditleadsourceForm(leadsourceid) {
      this.leadsourceEditObj = this.getLeadsourceByID(leadsourceid);
      this.showEditLeadsourceForm = !this.showEditLeadsourceForm;
    },
    deleteleadSource(leadsourceid) {
      if (leadsourceid) {
        const c = confirm("Do you want to delete this Lead Source?");
        if (c) {
          let payload = {};
          payload.leadsourceid = leadsourceid.toString();
          this.deleteLeadSource(payload);
          this.showAlerts();
        }
      }
    },
    closeEditModel() {
      this.showEditLeadsourceForm = !this.showEditLeadsourceForm;
    },
  },
};
</script>
