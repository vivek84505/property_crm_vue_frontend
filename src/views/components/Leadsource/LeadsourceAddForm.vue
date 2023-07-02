<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Add Lead Source</h6>

      <form
        @submit.prevent="addleadsourceform($event)"
        role="form"
        class="text-start"
      >
        <div class="row">
          <div class="col-md-4">
            <label>Lead Source</label>
            <input
              v-model="leadsourceformdata.leadsource"
              id="leadsource"
              type="text"
              placeholder="leadsource"
              name="leadsource"
              class="form-control form-control-default"
            />
            <span v-if="leadsourceErrors.leadsource" class="form-error">{{
              this.leadsourceErrors.leadsource
            }}</span>
          </div>

          <input
            type="hidden"
            name="createdby"
            id="createdby"
            v-model="leadsourceformdata.createdby"
          />
          <div class="col-md-2">
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
export default {
  name: "UsersAddForm",
  props: ["userlist"],
  emits: ["addleadsourceform"],
  data() {
    return {
      leadsourceformdata: {
        leadsource: "",
        createdby: "admin@gmail.com",
      },
      leadsourceErrors: {},
    };
  },
  methods: {
    addleadsourceform() {
      this.leadsourceErrors = {};

      if (!this.leadsourceformdata.leadsource) {
        this.leadsourceErrors.leadsource = "Lead Source is required";
      } else {
        this.leadsourceErrors.leadsource = "";
      }

      const hasErrors = Object.values(this.leadsourceErrors).some(
        (error) => error !== ""
      );

      if (!hasErrors) {
        this.$emit("addleadsourceform", this.leadsourceformdata);
      }
    },
  },

  components: {
    SoftButton,
  },
};
</script>
