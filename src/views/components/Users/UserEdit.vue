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
              </div>

              <div class="col-md-4 align-self-end">
                <div class="text-center">
                  <button class="btn btn-success btn-sm btn-lg">Update</button>
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
  emits: ["close-edit-model"],
  props: ["userEditObj"],
  data() {
    return {
      usermodelEditobj: {},
    };
  },
  mounted() {
    this.usermodelEditobj = this.userEditObj;
  },
  methods: {
    closeEditModel() {
      this.$emit("close-edit-model");
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
