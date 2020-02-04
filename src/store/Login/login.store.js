import { _resource } from "@/api/_resource";

const state = {
  token: null,
  permissions: [],
  info: []
};

const actions = {
  async submit(context, payload) {
    await _resource.save("merchant-login", payload).then(response => {
      console.log('submit')
      if (response) {
        context.commit("LOGIN_SUBMIT", response);
      }
    });
  },
  userinfo(context) {
    context.commit("LOGIN_INFO")
  },
  logout(context) {
    context.commit("LOGOUT_SUBMIT");
  }
};

const mutations = {
  LOGIN_SUBMIT: (state, data) => {
    let res = data.data;
    state.token = null;
    state.verified = '';

    if (data.success) {
      state.token = res.access_token
      state.verified = res.verified
      state.info = res.user
      state.permissions = res.permissions

      localStorage.setItem("token", res.access_token)
      localStorage.setItem("verified", JSON.stringify(res.verified))
      localStorage.setItem("info", JSON.stringify(res.user))
      localStorage.setItem("permissions", JSON.stringify(res.permissions))
    }
  },
  LOGIN_INFO: (state) => {
    state.info = JSON.parse(localStorage.getItem("info"))
    state.verified = JSON.parse(localStorage.getItem("verified"))
    state.permissions = JSON.parse(localStorage.getItem("permissions"))
  },
  LOGOUT_SUBMIT: (state) => {
    state.token = null
    state.verified = ''
    state.info = []
    state.permissions = []

    localStorage.removeItem("token")
    localStorage.removeItem("verified")
    localStorage.removeItem("info")
    localStorage.removeItem("permissions")
  },
  LOGIN_RESET: (state) => {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
};

export const login = {
  namespaced: true,
  state,
  actions,
  mutations
};
