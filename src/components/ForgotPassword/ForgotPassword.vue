<template src="./ForgotPassword.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import Modal from "@/partials/Modal/Modal.vue"
import VueRecaptcha from 'vue-recaptcha'

import { required, email } from "vuelidate/lib/validators"
import { mapState, mapActions } from "vuex"

const container = {
  state: mapState({
    txn_status: state => state.forgotpassword.status
  }),
  actions: mapActions({
    submit: "forgotpassword/submit"
  })
}

export default {
  name: "ForgotPassword",
  components: {
    PageLoader,
    Modal,
    VueRecaptcha
  },
  computed: {
    ...container.state
  },
  data() {
    return {
      form: {
        email: "",
        recaptcha : ''
      },
      loader: true,
      init_load: false,
      modal: {
        title: "Forgot Password",
        content: "Please check your email. We sent a verification link."
      },
      recaptcha_token_error: false
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      recaptcha: {}
    }
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
    submitForgotPassword() {
      this.$v.$touch();
      if (this.form.recaptcha == '') {
        this.recaptcha_token_error = true
      }

      if (!this.$v.$invalid && !this.recaptcha_token_error) {
        this.sendForgotPassword()
      }
      return false;
    },
    sendForgotPassword() {
      var self = this
      self.loader = true
      self.submit(self.form).then(() => {
        if (self.txn_status) {
          self.email = "";
          self.$v.$reset();
          self.loader = false;
          self.$bvModal.show("g-modal");
        }
      }).catch(() => {
        self.loader = false
      })
    },
    onCaptchaVerified(recaptchaToken) {
      this.recaptcha_token_error = false
      this.form.recaptcha = recaptchaToken
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    pushToLoginPage() {
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped src="./ForgotPassword.css"></style>
