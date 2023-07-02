<template>
  <div class="modal">
    <div class="modal-content">
      <slot>
        <span @click="closeEditModel()">
          <i style="float: right" class="fas fa-window-close"></i>
        </span>

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
                  v-model="usermodelEditobj.firstname"
                  id="firstname"
                  type="text"
                  placeholder="firstname"
                  name="firstname"
                  class="form-control form-control-default"
                />
                <span v-if="userEditformErrors.firstname" class="form-error"
                  >{{ this.userEditformErrors.firstname }}
                </span>
              </div>
              <div class="col-md-4">
                <label>Lastname</label>
                <input
                  v-model="usermodelEditobj.lastname"
                  id="lastname"
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  class="form-control form-control-default"
                />
                <span v-if="userEditformErrors.lastname" class="form-error"
                  >{{ this.userEditformErrors.lastname }}
                </span>
              </div>

              <div class="col-md-4">
                <label>Email</label>
                <input
                  v-model="usermodelEditobj.email"
                  id="email"
                  type="email"
                  placeholder="email"
                  name="email"
                  class="form-control form-control-default"
                />
                <span v-if="userEditformErrors.email" class="form-error"
                  >{{ this.userEditformErrors.email }}
                </span>
              </div>

              <div class="col-md-4">
                <label>Mobile</label>
                <input
                  v-model="usermodelEditobj.mobile"
                  type="text"
                  placeholder="mobile"
                  name="mobile"
                  class="form-control form-control-default"
                  id="mobile"
                />
                <span v-if="userEditformErrors.mobile" class="form-error"
                  >{{ this.userEditformErrors.mobile }}
                </span>
              </div>

              <div class="col-md-4">
                <label>User Role</label>
                <select
                  v-model="usermodelEditobj.userrole"
                  class="form-control form-control-default"
                  name="userrole"
                  value=""
                  id="userrole"
                >
                  <option value="">select</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="user">User</option>
                </select>
                <span v-if="userEditformErrors.userrole" class="form-error"
                  >{{ this.userEditformErrors.userrole }}
                </span>
              </div>

              <div class="col-md-4 align-self-end">
                <div class="text-center">
                  <button
                    @onclick="edituserform"
                    class="btn btn-success btn-sm btn-lg"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  emits: ["close-edit-model", "edituserform"],
  props: ["userEditObj"],
  data() {
    return {
      usermodelEditobj: {},
      userEditformErrors: {},
    };
  },

  watch: {
    userEditObj: {
      immediate: true,
      handler(newVal) {
        this.usermodelEditobj = {
          firstname: newVal.firstname,
          lastname: newVal.lastname,
          email: newVal.email,
          mobile: newVal.mobile,
          userrole: newVal.userrole,
          user_id: newVal.user_id,
        };
      },
    },
  },
  methods: {
    closeEditModel() {
      this.$emit("close-edit-model");
    },
    edituserform() {
      this.userEditformErrors = {};

      if (
        !this.usermodelEditobj.firstname ||
        this.usermodelEditobj.firstname.trim().length == 0
      ) {
        this.userEditformErrors.firstname = "Firstname is required";
      } else {
        this.userEditformErrors.firstname = "";
      }

      if (
        !this.usermodelEditobj.lastname ||
        this.usermodelEditobj.lastname.trim().length == 0
      ) {
        this.userEditformErrors.lastname = "Lastname is required";
      } else {
        this.userEditformErrors.lastname = "";
      }

      if (
        !this.usermodelEditobj.email ||
        this.usermodelEditobj.email.trim().length == 0
      ) {
        this.userEditformErrors.email = "Email is required";
      } else if (!this.isValidEmail(this.usermodelEditobj.email)) {
        this.userEditformErrors.email = "Invalid email format";
      } else {
        this.userEditformErrors.email = "";
      }

      if (
        !this.usermodelEditobj.mobile ||
        this.usermodelEditobj.mobile.trim().length == 0
      ) {
        this.userEditformErrors.mobile = "Mobile is required";
      } else {
        this.userEditformErrors.mobile = "";
      }

      if (
        !this.usermodelEditobj.userrole ||
        this.usermodelEditobj.userrole.trim().length == 0
      ) {
        this.userEditformErrors.userrole = "userrole is required";
      } else {
        this.userEditformErrors.userrole = "";
      }

      const hasErrors = Object.values(this.userEditformErrors).some(
        (error) => error !== ""
      );

      if (!hasErrors) {
        this.$emit("edituserform", this.usermodelEditobj);
      }
    },
    isValidEmail(email) {
      // Email validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;

  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999; /* Adjust the z-index value */
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  max-width: 800px; /* Adjust the width as needed */
  max-height: 80vh; /* Adjust the height as needed */
  overflow-y: auto; /* Enable scrolling if the content exceeds the height */
}
</style>
