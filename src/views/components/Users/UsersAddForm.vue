<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Add User</h6>

      <form
        @submit.prevent="adduserform($event)"
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
            <span v-if="userformErrors.firstname" class="form-error"
              >{{ this.userformErrors.firstname }}
            </span>
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
            <span v-if="userformErrors.lastname" class="form-error"
              >{{ this.userformErrors.lastname }}
            </span>
          </div>

          <div class="col-md-4">
            <label>Email</label>
            <input
              novalidate
              v-model="userformdata.email"
              id="email"
              type="text"
              placeholder="email"
              name="email"
              class="form-control form-control-default"
            />
            <span v-if="userformErrors.email" class="form-error"
              >{{ this.userformErrors.email }}
            </span>
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
            <span v-if="userformErrors.mobile" class="form-error"
              >{{ this.userformErrors.mobile }}
            </span>
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
            <span v-if="userformErrors.userrole" class="form-error"
              >{{ this.userformErrors.userrole }}
            </span>
          </div>
          <div class="col-md-4">
            <div class="text-center">
              <soft-button
                type="submit"
                class="my-4 mb-2"
                variant="gradient"
                color="success"
                full-width
                >Submit
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
  name: "UsersAddForm",
  props: ["userlist"],
  emits: ["adduserform"],
  data() {
    return {
      userformdata: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        userrole: "",
      },
      userformErrors: {},
    };
  },
  methods: {
    ...mapActions("users", ["addUser", "fetchUsersAll"]),

    adduserform() {
      this.userformErrors = {};

      if (
        !this.userformdata.firstname &&
        this.userformdata.firstname.trim().length == 0
      ) {
        this.userformErrors.firstname = "Firstname is required";
      } else {
        this.userformErrors.firstname = "";
      }

      if (
        !this.userformdata.lastname &&
        this.userformdata.lastname.trim().length == 0
      ) {
        this.userformErrors.lastname = "Lastname is required";
      } else {
        this.userformErrors.lastname = "";
      }

      if (
        !this.userformdata.email &&
        this.userformdata.email.trim().length == 0
      ) {
        this.userformErrors.email = "Email is required";
      } else if (!this.isValidEmail(this.userformdata.email)) {
        this.userformErrors.email = "Invalid email format";
      } else {
        this.userformErrors.email = "";
      }

      if (
        !this.userformdata.mobile &&
        this.userformdata.mobile.trim().length == 0
      ) {
        this.userformErrors.mobile = "Mobile is required";
      } else {
        this.userformErrors.mobile = "";
      }

      if (
        !this.userformdata.userrole &&
        this.userformdata.userrole.trim().length == 0
      ) {
        this.userformErrors.userrole = "userrole is required";
      } else {
        this.userformErrors.userrole = "";
      }

      const hasErrors = Object.values(this.userformErrors).some(
        (error) => error !== ""
      );

      if (!hasErrors) {
        this.$emit("adduserform", this.userformdata);
      }
    },
    isValidEmail(email) {
      // Email validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },

  components: {
    SoftButton,
  },
};
</script>
