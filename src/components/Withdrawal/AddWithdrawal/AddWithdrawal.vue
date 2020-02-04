<template src="./AddWithdrawal.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import Modal from "@/partials/Modal/Modal.vue"

import { required, minLength, numeric, sameAs } from "vuelidate/lib/validators"
import { mapState, mapActions } from "vuex"

import currencyJson from '@/assets/static/Currency.json'
import countryJson from '@/assets/static/Country.json'

const container = {
  state: mapState({
    balance_status: state => state.balances.status,
    balances: state => state.balances.data,
    withdrawal_status: state => state.withdrawals.status
  }),
  actions: mapActions({
    qry_balances: "balances/query",
    submit: "withdrawals/store"
  })
}

export default {
  name: "AddWithdrawal",
  data() {
    return {
      loader: false,
      withdrawals: [],
      modal: {
        title: '',
        content: ''
      },
      form: {
        merchant_currency_from: '',
        currency: '',
        amount: '',
        account_number: '',
        account_type: '',
        beneficiary_name: '',
        beneficiary_country: '',
        beneficiary_address: '',
        bank_name: '',
        swift_code: '',
        bank_address: '',
        bank_country: '',
        contact_number: '',
        remarks: ''
      },
      currency_list : currencyJson,
      country_list: countryJson
    };
  },
  validations: {
    form: {
        merchant_currency_from: {required},
        currency: { required },
        amount: { required, numeric },
        account_number: { required },
        account_type: { required },
        beneficiary_name: { required },
        beneficiary_country: { required },
        beneficiary_address: { required },
        bank_name: { required },
        swift_code: { required },
        bank_address: { required },
        bank_country: { required },
        contact_number: { required },
        remarks: {}
      }
  },
  components: {
    PageLoader,
    Modal
  },
  computed: {
    ...container.state
  },
  mounted() {
    this.loader = false
    this.getBalances()
  },
  methods: {
    ...container.actions,
    getBalances() {
      var self = this
      var merchant = JSON.parse(localStorage.getItem("info"))
      self.loader = true

      self.qry_balances('balances/merchant/' + merchant.merchant_id).then(() => {
        if (self.balance_status) {
          self.loader = false
          if (!self.balances.length) {
            self.modal.title = "Make a Deposit";
            self.modal.content = "Please deposit account first.";
            self.$bvModal.show("g-modal");
          }
        }
      }).catch(() => {
        self.loader = false
      })
    },
    submitWithdrawal() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendAddWithdrawal()
      }
      return false;
    },
    setSelectedAccount(currency) {
      this.selected_account = currency
      this.show_account_error = false
    },
    sendAddWithdrawal() {
      var self = this
      self.loader = true

      self.submit(self.form).then(() => {
        if (self.withdrawal_status) {
          self.loader = false
          self.loader = false
          self.modal.title = "Withdrawal Request";
          self.modal.content = "Withdrawal has been requested.";
          self.$bvModal.show("g-modal");
        }
      }).catch(() => {
        self.loader = false
      })
    },
    pushToWithdrawalListPage() {
      this.$router.push('/withdrawals')
    }
  }
};
</script>
<style scoped src="./AddWithdrawal.css"></style>
