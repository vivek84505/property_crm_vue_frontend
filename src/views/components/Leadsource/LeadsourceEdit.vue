<template>
  <div class="modal">
    <div class="modal-content">
      <slot>
        <span @click="closeEditModel()">
          <i style="float: right" class="fas fa-window-close"></i>
        </span>

        <div class="card-header pb-0">
          <h6>Edit Lead Source</h6>

          <form
            @submit.prevent="editleadsourceform($event)"
            role="form"
            class="text-start"
          >
            <div class="row">
              <div class="col-md-4">
                <label>Lead Source</label>
                <input
                  v-model="leadsourcemodelEditobj.leadsource"
                  id="firstname"
                  type="text"
                  placeholder="firstname"
                  name="firstname"
                  class="form-control form-control-default"
                />
              </div>

              <input
                type="hidden"
                name="leadsourceid"
                id="leadsourceid"
                v-model="leadsourcemodelEditobj.leadsourceid"
              />

              <div class="col-md-4 align-self-end">
                <div class="text-center">
                  <button
                    @onclick="editleadsourceform"
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
  emits: ["close-edit-model", "editleadsourceform"],
  props: ["leadsourceEditObj"],
  data() {
    return {
      leadsourcemodelEditobj: {},
    };
  },
  mounted() {
    console.log(
      "this.leadsourceEditObj.user_id====>",
      this.leadsourceEditObj.user_id
    );

    this.leadsourcemodelEditobj = {
      leadsourceid: this.leadsourceEditObj.leadsourceid,
      leadsource: this.leadsourceEditObj.leadsource,
      lastmodifiedby: "admin@gmail.com",
    };
  },
  methods: {
    closeEditModel() {
      this.$emit("close-edit-model");
    },
    editleadsourceform() {
      this.$emit("editleadsourceform", this.leadsourcemodelEditobj);
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
