<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Users Master</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Author
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Role
              </th>

              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Mobile
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Employed
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userlist" :key="user.user_id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar
                      :img="img1"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">
                      {{ user.firstname }} {{ user.lastname }}
                    </h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.userrole }}</p>
              </td>

              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.mobile }}</p>
              </td>

              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  user.created_date
                }}</span>
              </td>
              <td class="align-middle text-center">
                <button
                  class="btn mb-0 bg-gradient-success btn-md w-50 null my-2 mb-1"
                  @click="openEdituserForm(user.user_id)"
                >
                  <span class="d-inline-block text-center">Edit</span>
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
import SoftAvatar from "@/components/SoftAvatar.vue";
// import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "../../../assets/img/team-2.jpg";
import img2 from "../../../assets/img/team-3.jpg";
import img3 from "../../../assets/img/team-4.jpg";
import img4 from "../../../assets/img/team-3.jpg";
import img5 from "../../../assets/img/team-2.jpg";
import img6 from "../../../assets/img/team-4.jpg";

export default {
  name: "users-table",
  props: ["userlist"],
  emits: ["open-edit-user-form"],
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
    openEdituserForm(userid) {
      this.$emit("open-edit-user-form", userid);
    },
  },
  components: {
    SoftAvatar,
    // SoftBadge,
  },
};
</script>
