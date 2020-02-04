<template src="./Login.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"

import { mapState, mapActions } from "vuex"

const container = {
  state: mapState({
    token: state => state.login.token,
    verified: state => state.login.verified
  }),
  actions: mapActions({
    login: "login/submit"
  })
}

export default {
  name: "Login",
  data() {
    return {
      init_load: false,
      email: "",
      password: "",
      loader: true
    };
  },
  components: {
    PageLoader
  },
  beforeRouteLeave (to, from, next) {
    this.init_load = false
    setTimeout(function(){
      next()
    }, 100)
    //
  },
  mounted() {
    var self = this
    self.loader = false
    setTimeout(function(){
      self.init_load = true
    }, 100)
  },
  methods: {
    ...container.actions,
    loginPost() {
      let self = this;
      let payload = { email: self.email, password: self.password }

      self.loader = true
      self.login(payload)
        .then(() => {
          self.loader = false
          self.$router.push("/");
        }).catch(() => {
          self.loader = false
        })
    }
  }
};
</script>
<style scoped src="./Login.css"></style>
