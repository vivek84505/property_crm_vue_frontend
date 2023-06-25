import axios from "axios";

export default {
  namespaced: true,
  state: {
    users: [],
    alertData: {
      showSuccessMessage: false,
      showErrorMessage: false,
      alertMessage: "",
    },
  },
  mutations: {
    SetUsers(state, payload) {
      state.users = payload;
    },
    addNewUser(state, payload) {
      state.products.unshift(payload);
    },
    setAlertData(state, payload) {
      state.alertData = payload;
    },
    resetAlertData(state, payload) {
      state.alertData = payload;
    },
    updateUser(state, payload) {
      const userIdToUpdate = payload.user_id; // Assuming the payload contains the user_id to update
      const updatedUser = payload; // Assuming the payload contains the updated user data

      const updatedUserIndex = state.users.findIndex(
        (user) => user.user_id == userIdToUpdate
      );
      if (updatedUserIndex !== -1) {
        // Update the user in the state.users array
        state.users.splice(updatedUserIndex, 1, updatedUser);
      }
    },
  },
  actions: {
    async addUser({ commit }, payload) {
      axios({
        method: "post",
        url: "http://localhost:8081/api/v1/adduser",
        data: payload,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.status.toLowerCase() == "sucess") {
            let alertObj = {
              showSuccessMessage: true,
              alertMessage: response.data.returnmsg,
            };
            console.log("form sucess");
            commit("setAlertData", alertObj);
            commit("addNewUser", response.data);
          } else {
            let alertObj = {
              showErrorMessage: true,
              alertMessage: response.data.returnmsg,
            };

            commit("setAlertData", alertObj);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async updateUser({ commit }, payload) {
      // let ref = this;
      console.log("edit payload", JSON.stringify(payload));
      axios({
        method: "post",
        url: "http://localhost:8081/api/v1/updateuser",
        data: payload,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          // console.log("Update user Response======>", response);
          if (response.data.status.toLowerCase() == "sucess") {
            let alertObj = {
              showSuccessMessage: true,
              alertMessage: response.data.returnmsg,
            };

            commit("setAlertData", alertObj);
            commit("updateUser", payload);
            // commit("addNewUser", response.data);
          } else {
            let alertObj = {
              showErrorMessage: true,
              alertMessage: response.data.returnmsg,
            };

            commit("setAlertData", alertObj);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async fetchUsersAll({ commit }) {
      let ref = this;
      await axios({
        method: "post",
        url: "http://localhost:8081/api/v1/getusers",
        data: {},
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          ref.loading = true;

          const data = response.data.returnval;
          console.log("data===>", data);

          const results = [];
          for (const id in data) {
            const createdDate = new Date(
              data[id].created_date
            ).toLocaleDateString();

            results.push({
              user_id: data[id].user_id,
              firstname: data[id].firstname,
              lastname: data[id].lastname,
              email: data[id].email,
              mobile: data[id].mobile,
              userrole: data[id].userrole,
              city: data[id].city,
              created_date: createdDate,
            });
            commit("SetUsers", results);
            // state.users = results;
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetAlertData({ commit }) {
      let alertObj = {
        showErrorMessage: false,
        showSuccessMessage: false,
        alertMessage: "",
      };
      commit("resetAlertData", alertObj);
    },
  },
  getters: {
    getUsersAll(state) {
      return state.users;
    },
    getUserByID: (state) => (userid) => {
      return state.users.find((user) => user.user_id === userid) || null;
    },
    getalertData(state) {
      return state.alertData;
    },
  },
};
