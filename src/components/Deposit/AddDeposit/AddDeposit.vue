<template src="./AddDeposit.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import FileUpload from "@/partials/FileUpload/FileUpload.vue"
import Modal from "@/partials/Modal/Modal.vue"

import { required, minLength, numeric, sameAs } from "vuelidate/lib/validators"
import { mapState, mapActions } from "vuex"

import currencyJson from '@/assets/static/Currency.json'

const container = {
  state: mapState({
    txn_status: state => state.bankaccounts.status,
    deposit_status: state => state.deposits.status,
    bank_accounts: state => state.bankaccounts.data
  }),
  actions: mapActions({
    query: "bankaccounts/query",
    add_deposit: "deposits/store"
  })
}

export default {
  name: "AddDeposit",
  data() {
    return {
      loader: false,
      form: {
        bank_account_id: "",
        currency: '',
        amount: '',
        transaction_date: '',
        deposit_slip: '',
        message: ''
      },
      currency_lists : currencyJson,
      modal: {
        title : "Error",
        content: "There was an error encountered on your request."
      },
    };
  },
  validations: {
    form: {
      bank_account_id: { required },
      currency: { required },
      amount: { required, numeric },
      transaction_date: { required },
      deposit_slip: {},
      message: {}
    }
  },
  components: {
    PageLoader,
    FileUpload,
    Modal
  },
  computed: {
    ...container.state
  },
  mounted() {
    this.loader = false
    this.getBankAccounts()
  },
  methods: {
    ...container.actions,
    getBankAccounts() {
      var self = this
      self.loader = true

      self.query('bank-accounts').then(() => {
        if (self.txn_status) {
          self.loader = false;
        }
      }).catch(() => {
        self.loader = false
      })
    },
    submitAddDeposit() {
      this.$v.$touch();

      var form_slip = this.$refs.file_deposit_slip
      var file_valid = form_slip.validate()
      if (!this.$v.$invalid && file_valid) {
        this.sendAddDeposit()
      }
      return false;
    },
    sendAddDeposit() {
      var self = this
      self.loader = true

      let formData = new FormData()
      let entries = Object.entries(self.form)

      for (const [key, value] of entries) {
        if (key != "deposit_slip") {
          formData.append(key, value);
        }
      }

      formData.append("deposit_slip", this.$refs.file_deposit_slip.$refs.file.files[0])

      self.add_deposit(formData).then(() => {
        if (self.deposit_status) {
          self.loader = false
          self.modal.title = "Deposit Request";
          self.modal.content = "Deposit has been requested.";
          self.$bvModal.show("g-modal");
        }
      }).catch(() => {
        self.loader = false
      })
    },
    pushToDepositListPage() {
      this.$router.push('/deposits')
    }
  }
};
</script>
<style scoped src="./AddDeposit.css"></style>
