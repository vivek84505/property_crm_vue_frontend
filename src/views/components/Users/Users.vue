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
        <users-table
          @open-edit-user-form="openEdituserForm"
          :userlist="userlist"
        />
      </div>
    </div>

    <UserEdit
      :userEditObj="userEditObj"
      @close-edit-model="closeEditModel"
      @edituserform="edituserform"
      v-if="showEditUserForm"
    >
    </UserEdit>

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
import UsersTable from "./UsersTable.vue";
import UsersAddForm from "./UsersAddForm.vue";
// import UserEditForm from "./components/Users/UserEditForm.vue";
import UserEdit from "./UserEdit.vue";
// import ProjectsTable from "./components/ProjectsTable";
// import SoftModelInput from "@/components/SoftModelInput.vue";
import { mapState, mapActions, mapGetters } from "vuex";
// import SoftAlert from "../components/SoftAlert.vue";

import SoftAlert from "../../../components/SoftAlert.vue";
export default {
  name: "tables",
  components: {
    UsersTable,
    UsersAddForm,
    SoftAlert,
    // UserEditForm,
    UserEdit,
    // ProjectsTable,
    // SoftModelInput,
  },
  data() {
    return {
      showEditModel: false,
      showAddUserForm: false,
      showEditUserForm: false,
      userEditObj: {
        user_id: 86,
        firstname: "Vivek",
        lastname: "Deshpande",
        email: "vivek84505@gmail.com",
        mobile: "+919403384505",
        userrole: "superadmin",
        isactive: null,
        createdby: "null",
        created_date: "2023-06-23T18:30:00.000Z",
        lastmodifiedby: null,
        updated_at: null,
      },
    };
  },
  computed: {
    ...mapGetters("users", ["getUsersAll", "getUserByID"]),
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
    ...mapActions("users", [
      "fetchUsersAll",
      "addUser",
      "resetAlertData",
      "updateUser",
    ]),
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
    async edituserform(payload) {
      payload.user_id = payload.user_id.toString();
      this.updateUser(payload);
      // this.fetchUsersAll();
      this.showAlerts();
    },
    openEdituserForm(userid) {
      this.userEditObj = this.getUserByID(userid);
      this.showEditUserForm = !this.showEditUserForm;
    },
    closeEditModel() {
      this.showEditUserForm = !this.showEditUserForm;
    },
  },
};
</script>
