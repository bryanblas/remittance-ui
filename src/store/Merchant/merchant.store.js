import { _resource } from "@/api/_resource";

const state = {
  status: false,
  data: [],
  error_code: null
};

const actions = {
  async store(context, payload) {
    await _resource.save("merchant", payload).then(response => {
      if (response) {
        context.commit("MERCHANT_SAVED", response);
      }
    });
  },
  async query(context, query) {
    await _resource.query(query).then(response => {
      if (response) {
        context.commit("MERCHANT_FETCHED", response);
      }
    });
  },
  async update({ commit }, payload) {
    await _resource.update("merchant/" + state.data.id, payload).then(response => {
      if (response != undefined) {
        commit("MERCHANT_UPDATED", response);
      }
    });
  },
  async import({ commit }, payload) {
    await _resource.save("merchant/import", payload).then(response => {
      if (response != undefined) {
        commit("MERCHANT_IMPORT", response);
      }
    });
  }
};

const mutations = {
  MERCHANT_SAVED: (state, data) => {
    let res = data;
    state.status = res.success;
  },
  MERCHANT_FETCHED(state, payload) {
    let res = payload.data;
    state.data = res;
    if (payload.success) {
      state.status = payload.success;
    }
  },
  MERCHANT_UPDATED: (state, data) => {
    let res = data.data;
    state.data = res;
    state.status = data.success;
  },
  MERCHANT_IMPORT: (state, data) => {
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

export const merchants = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
