import { _resource } from "@/api/_resource";

const state = {
  status: false,
  data: [],
  error_code: null
};

const actions = {
  async store(context, payload) {
    await _resource.save("kyc-document", payload).then(response => {
      if (response) {
        context.commit("KYC_SAVED", response);
      }
    });
  },
  async query(context, query) {
    await _resource.query(query).then(response => {
      if (response) {
        context.commit("KYC_FETCHED", response);
      }
    });
  },
  async update({ commit }, payload) {
    await _resource.update("kyc-document/" + state.data.id, payload).then(response => {
      if (response != undefined) {
        commit("KYC_UPDATED", response);
      }
    });
  }
};

const mutations = {
  KYC_SAVED: (state, data) => {
    let res = data;
    state.status = res.success;
  },
  KYC_FETCHED(state, payload) {
    let res = payload.data;
    state.data = res;
    if (payload.success) {
      state.status = payload.success;
    }
  },
  KYC_UPDATED: (state, data) => {
    let res = data.data;
    state.data = res;
    state.status = data.success;
  }
};

const getters = {
  lists: state => {
    return state.data;
  }
};

export const kycdocuments = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
