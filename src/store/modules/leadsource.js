import axios from "axios";

export default {
  namespaced: true,
  state: {
    leadsourcedata: {},
    alertData: {
      showSuccessMessage: false,
      showErrorMessage: false,
      alertMessage: "",
    },
  },
  mutations: {
    SetLeadSource(state, payload) {
      // console.log("leadsource added mutation====>", payload);
      state.leadsourcedata = payload;
    },
    setAlertData(state, payload) {
      state.alertData = payload;
    },
    addNewLeadsource(state, payload) {
      state.leadsourcedata.unshift(payload);
    },
    resetAlertData(state, payload) {
      state.alertData = payload;
    },
    deleteLeadSource(state, payload) {
      const index = state.leadsourcedata.findIndex(
        (leadsource) => leadsource.leadsourceid == payload.leadsourceid
      );
      if (index !== -1) {
        state.leadsourcedata.splice(index, 1);
      }
    },
    updateLeadsource(state, payload) {
      const leadsourceToUpdate = payload.leadsourceid;
      const updatedLeadsource = payload;

      const updatedLeadsourceIndex = state.leadsourcedata.findIndex(
        (leadsource) => leadsource.leadsourceid == leadsourceToUpdate
      );

      if (updatedLeadsourceIndex !== -1) {
        state.leadsourcedata.splice(
          updatedLeadsourceIndex,
          1,
          updatedLeadsource
        );
      }
    },
  },
  actions: {
    async updateLeadsource({ commit, dispatch }, payload) {
      await axios({
        method: "post",
        url: "http://localhost:8081/api/v1/updateleadsource",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        if (response.data.status.toLowerCase() == "sucess") {
          let alertObj = {
            showSuccessMessage: true,
            alertMessage: response.data.returnmsg,
          };

          commit("setAlertData", alertObj);
          commit("updateLeadsource", payload);
          dispatch("fetchLeadsourceAll");
        } else {
          let alertObj = {
            showErrorMessage: true,
            alertMessage: response.data.returnmsg,
          };

          commit("setAlertData", alertObj);
        }
      });
    },
    async fetchLeadsourceAll({ commit }) {
      await axios({
        method: "post",
        url: "http://localhost:8081/api/v1/getleadsourceall",
        data: {},
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        const data = response.data.returnval;
        const results = [];
        for (const id in data) {
          const createddate = new Date(
            data[id].createddate
          ).toLocaleDateString();
          const lastmodifieddate = new Date(
            data[id].lastmodifieddate
          ).toLocaleDateString();

          results.push({
            leadsourceid: data[id].leadsourceid,
            leadsource: data[id].leadsource,
            createddate: createddate,
            lastmodifieddate: lastmodifieddate,
            createdby: data[id].createdby,
            lastmodifiedby: data[id].lastmodifiedby,
          });
        }
        console.log("leadsource getall results====>", results);
        commit("SetLeadSource", results);
      });
    },
    async deleteLeadSource({ commit }, payload) {
      axios({
        method: "post",
        url: "http://localhost:8081/api/v1/deleteleadsource",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        if (response.data.status.toLowerCase() == "sucess") {
          let alertObj = {
            showSuccessMessage: true,
            alertMessage: response.data.returnmsg,
          };

          commit("setAlertData", alertObj);
          commit("deleteLeadSource", payload);
        } else {
          let alertObj = {
            showErrorMessage: true,
            alertMessage: response.data.returnmsg,
          };

          commit("setAlertData", alertObj);
        }
      });
    },
    async addLeadSource({ commit, dispatch }, payload) {
      axios({
        method: "post",
        url: "http://localhost:8081/api/v1/addleadsource",
        data: payload,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        if (response.data.status.toLowerCase() == "sucess") {
          let alertObj = {
            showSuccessMessage: true,
            alertMessage: response.data.returnmsg,
          };
          commit("setAlertData", alertObj);
          dispatch("fetchLeadsourceAll");
          commit("addNewLeadsource", response.data.returnval);
        } else {
          let alertObj = {
            showErrorMessage: true,
            alertMessage: response.data.returnmsg,
          };

          commit("setAlertData", alertObj);
        }
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
    getalertData(state) {
      return state.alertData;
    },
    getLeadsourceAll(state) {
      return state.leadsourcedata;
    },
    getLeadsourceByID: (state) => (leadsourceid) => {
      return (
        state.leadsourcedata.find(
          (leadsource) => leadsource.leadsourceid === leadsourceid
        ) || null
      );
    },
  },
};
