import { _resource } from "@/api/_resource";

const state = {
  status: false,
  data: []
};

const actions = {
  async submit(context, payload) {
    await _resource
      .save("/merchant/reset-password/" + payload.hash, payload)
      .then(response => {
        if (response) {
          context.commit("RESET_PASSWORD", response);
        }
      });
  },
  async query(context, query) {
    await _resource.query(query).then(response => {
      if (response) {
        context.commit("RESET_HASH_FETCHED", response);
      }
    });
  }
};

const mutations = {
  FORGOT_PASSWORD(state, data) {
    state.status = data.success;
  },
  RESET_HASH_FETCHED(state, payload) {
    let res = payload.data;
    state.data = res;
    state.status = payload.success;
  }
};

export const resetpassword = {
  namespaced: true,
  state,
  actions,
  mutations
};
