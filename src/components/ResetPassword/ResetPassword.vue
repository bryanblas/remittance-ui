<template src="./ResetPassword.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import Modal from "@/partials/Modal/Modal.vue"

import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";

const container = {
  state: mapState({
    txn_status: state => state.resetpassword.status,
    hash_data: state => state.resetpassword.data
  }),
  actions: mapActions({
    resetpassword: "resetpassword/submit",
    query: "resetpassword/query"
  })
};

export default {
  name: "ForgotPassword",
  components: {
    PageLoader,
    Modal
  },
  beforeRouteLeave (to, from, next) {
    this.init_load = false
    setTimeout(function(){
      next()
    }, 100)
    //
  },
  data() {
    return {
      loader: true,
      init_load: false,
      form: {
        password: "",
        password_confirmation: "",
        hash: ""
      },
      modal: {
        title: "Password Reset",
        content: "Your password has been reset."
      },
      invalidHash: false
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      password_confirmation: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    ...container.state
  },
  mounted() {
    var self = this
    self.form.hash = self.$route.params.hash;
    self.verifyHash();

    self.loader = false
    setTimeout(function(){
      self.init_load = true
    }, 100)
  },
  methods: {
    ...container.actions,
    verifyHash() {
      let self = this;
      self.loader = true;

      self
        .query("merchant/reset-password/" + self.form.hash)
        .then(() => {
          if (self.txn_status) {
            self.loader = false;
          }
        })
        .catch(() => {
          self.loader = false
          self.invalidHash = true
        });
    },
    submitReset() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.trigerReset();
      }
      return false;
    },
    trigerReset() {
      let self = this;
      self.loader = true;

      self.resetpassword(self.form).then(() => {
        if (self.txn_status) {
          self.form.email = "";
          self.loader = false;
          self.$bvModal.show("g-modal");
        }
      });
    },
    pushToLoginPage() {
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped src="./ResetPassword.css"></style>
