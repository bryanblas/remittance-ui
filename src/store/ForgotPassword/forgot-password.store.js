import { _resource } from "@/api/_resource";

const state = {
  status: false
};

const actions = {
  async submit(context, payload) {
    await _resource.save("merchant/forgot-password", payload).then(response => {
      if (response) {
        context.commit("FORGOT_PASSWORD", response);
      }
    });
  }
};

const mutations = {
  FORGOT_PASSWORD: (state, data) => {
    state.status = data.success;
  }
};

export const forgotpassword = {
  namespaced: true,
  state,
  actions,
  mutations
};
