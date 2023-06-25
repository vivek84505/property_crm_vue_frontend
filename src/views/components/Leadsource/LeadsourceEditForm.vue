<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Edit User</h6>

      <form
        @submit.prevent="edituserform($event)"
        role="form"
        class="text-start"
      >
        <div class="row">
          <div class="col-md-4">
            <label>Firstname</label>
            <input
              v-model="userformdata.firstname"
              id="firstname"
              type="text"
              placeholder="firstname"
              name="firstname"
              class="form-control form-control-default"
            />
          </div>
          <div class="col-md-4">
            <label>Lastname</label>
            <input
              v-model="userformdata.lastname"
              id="lastname"
              type="text"
              placeholder="lastname"
              name="lastname"
              class="form-control form-control-default"
            />
          </div>

          <div class="col-md-4">
            <label>Email</label>
            <input
              v-model="userformdata.email"
              id="email"
              type="email"
              placeholder="email"
              name="email"
              class="form-control form-control-default"
            />
          </div>

          <div class="col-md-4">
            <label>Mobile</label>
            <input
              type="text"
              placeholder="mobile"
              name="mobile"
              class="form-control form-control-default"
              v-model="userformdata.mobile"
              id="mobile"
            />
          </div>

          <div class="col-md-4">
            <label>User Role</label>
            <select
              v-model="userformdata.userrole"
              class="form-control form-control-default"
              name="userrole"
              value="userformdata.userrole"
              id="userrole"
            >
              <option value="">select</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="col-md-2">
            <div class="text-center">
              <soft-button
                type="submit"
                class="my-4 mb-2"
                variant="gradient"
                color="danger"
                full-width
                >Close
              </soft-button>
            </div>
          </div>

          <div class="col-md-2">
            <div class="text-center">
              <soft-button
                type="submit"
                class="my-4 mb-2"
                variant="gradient"
                color="success"
                full-width
                >Update
              </soft-button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0"></div>
    </div>
  </div>
</template>

<script>
import SoftButton from "@/components/SoftButton.vue";
import { mapActions } from "vuex";
export default {
  name: "UsersEditForm",
  props: ["edituserdata"],
  emits: ["edituserform"],
  data() {
    return {
      userformdata: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        userrole: "",
      },
    };
  },
  methods: {
    ...mapActions("users", ["addUser", "fetchUsersAll"]),
    edituserform() {
      // this.addUser(this.userformdata);

      this.$emit("edituserform", this.userformdata);
    },
  },

  components: {
    SoftButton,
  },
};
</script>
