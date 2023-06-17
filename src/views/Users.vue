<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="text-right">
          <button
            @click="showAddUserForm = !showAddUserForm"
            class="btn btn-success btn-sm btn-lg"
            style="float: right"
          >
            Add User
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
        <UsersAddForm @adduserform="adduserform" v-if="showAddUserForm" />
      </div>

      <div class="col-12">
        <users-table :userlist="userlist" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <projects-table />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "./components/Users/UsersTable.vue";
import UsersAddForm from "./components/Users/UsersAddForm.vue";
import ProjectsTable from "./components/ProjectsTable";
import SoftAlert from "@/components/SoftAlert.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "tables",
  components: {
    UsersTable,
    UsersAddForm,
    ProjectsTable,
    SoftAlert,
  },
  data() {
    return {
      showAddUserForm: false,
    };
  },
  computed: {
    ...mapGetters("users", ["getUsersAll"]),
    ...mapState("users", ["users"]),
    ...mapGetters("users", ["getalertData"]),
    alertData() {
      return this.getalertData;
    },

    userlist() {
      return this.getUsersAll;
    },
  },
  mounted: function () {
    this.fetchUsersAll();
  },

  methods: {
    ...mapActions("users", ["fetchUsersAll", "addUser", "resetAlertData"]),
    showAlerts() {
      setTimeout(() => {
        this.resetAlertData();
      }, 2000);
    },
    async adduserform(payload) {
      this.addUser(payload);
      this.fetchUsersAll();
      this.showAlerts();
      console.log("this main alertData=======>", this.alertData);
    },
  },
};
</script>
