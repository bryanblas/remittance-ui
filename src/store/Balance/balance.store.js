import { _resource } from "@/api/_resource";

const state = {
  status: false,
  data: [],
  error_code: null
};

const actions = {
  async query(context, query) {
    await _resource.query(query).then(response => {
      if (response) {
        context.commit("BALANCE_FETCHED", response);
      }
    });
  }
};

const mutations = {
  BALANCE_FETCHED(state, payload) {
    let res = payload.data;
    state.data = res;
    if (payload.success) {
      state.status = payload.success;
    }
  }
};

const getters = {
  lists: state => {
    return state.data;
  }
};

export const balances = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
