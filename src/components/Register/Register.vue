<template src="./Register.html"></template>
<script>
import { mapState, mapActions } from "vuex"
import { required, minLength, email, sameAs } from "vuelidate/lib/validators"

import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import Modal from "@/partials/Modal/Modal.vue"
import VueRecaptcha from 'vue-recaptcha'

import countryJson from '@/assets/static/Country.json'

const container = {
  state: mapState({
    txn_status: state => state.merchants.status
  }),
  actions: mapActions({
    save: "merchants/store"
  })
}

export default {
  name: "Register",
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
      loader: true,
      init_load: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "personal",
        recaptcha : ''
      },
      country_lists : countryJson,
      modal: {
        title : "Error",
        content: "There was an error encountered on your request."
      },
      recaptcha_token_error: false
    };
  },
  validations: {
    form: {
      first_name: {
        required,
        minLength: minLength(3)
      },
      last_name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      password_confirmation: {
        sameAsPassword: sameAs("password")
      },
      type: {}
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
    submitRegister() {
      this.$v.$touch();
      if (this.form.recaptcha == '') {
        this.recaptcha_token_error = true
      }
      if (!this.$v.$invalid && !this.recaptcha_token_error) {
        this.sendRegister()
      }
      return false;
    },
    sendRegister() {
      var self = this
      self.loader = true
      self.save(self.form).then(() => {
        if (self.txn_status) {
          self.loader = false
          self.modal.title = "Registration Successful"
          self.modal.content = "You have registered successfully, please check your email."
          self.$bvModal.show("g-modal")
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
<style src="./Register.css"></style>
