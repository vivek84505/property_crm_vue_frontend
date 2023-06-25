<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>LeadSource Master</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Lead Source
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                created by
              </th>

              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                created date
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Last Modified By
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Last Modified Date
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="leadsource in leadsourcelist"
              :key="leadsource.leadsourceid"
            >
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm text-center">
                      {{ leadsource.leadsource }}
                    </h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ leadsource.createdby }}
                    </h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm text-center">
                      {{ leadsource.createddate }}
                    </h6>
                  </div>
                </div>
              </td>

              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0 text-center">
                  {{ leadsource.lastmodifiedby }}
                </p>
              </td>

              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  leadsource.lastmodifieddate
                }}</span>
              </td>
              <td class="align-middle">
                <button
                  style="margin-right: 5px"
                  class="btn btn-danger w-50"
                  @click="deleteleadSource(leadsource.leadsourceid)"
                >
                  <span class="d-inline-block">Delete</span>
                </button>
                <button
                  class="btn btn-success w-50"
                  @click="openEditleadsourceForm(leadsource.leadsourceid)"
                >
                  <span class="d-inline-block">Edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "../../../assets/img/team-2.jpg";
import img2 from "../../../assets/img/team-3.jpg";
import img3 from "../../../assets/img/team-4.jpg";
import img4 from "../../../assets/img/team-3.jpg";
import img5 from "../../../assets/img/team-2.jpg";
import img6 from "../../../assets/img/team-4.jpg";

export default {
  name: "users-table",
  props: ["leadsourcelist"],
  emits: ["open-edit-leadsource-form", "delete-lead-source"],
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  computed() {},
  methods: {
    openEditleadsourceForm(leadsourceid) {
      this.$emit("open-edit-leadsource-form", leadsourceid);
    },
    deleteleadSource(leadsourceid) {
      this.$emit("delete-lead-source", leadsourceid);
    },
  },
};
</script>
