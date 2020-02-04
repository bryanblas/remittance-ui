import { _resource } from "@/api/_resource";

const state = {
  status: false,
  data: [],
  error_code: null
};

const actions = {
  async store(context, payload) {
    await _resource.save("withdrawal", payload).then(response => {
      if (response) {
        context.commit("WITHDRAWAL_SAVED", response);
      }
    });
  },
  async query(context, query) {
    await _resource.query(query).then(response => {
      if (response) {
        context.commit("WITHDRAWAL_FETCHED", response);
      }
    });
  },
  async update({ commit }, payload) {
    await _resource.update("withdrawal/" + state.data.id, payload).then(response => {
      if (response != undefined) {
        commit("WITHDRAWAL_UPDATED", response);
      }
    });
  }
};

const mutations = {
  WITHDRAWAL_SAVED: (state, data) => {
    let res = data;
    state.status = res.success;
  },
  WITHDRAWAL_FETCHED(state, payload) {
    let res = payload.data;
    state.data = res;
    if (payload.success) {
      state.status = payload.success;
    }
  },
  WITHDRAWAL_UPDATED: (state, data) => {
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

export const withdrawals = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
