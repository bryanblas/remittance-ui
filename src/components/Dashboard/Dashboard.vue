<template src="./Dashboard.html"></template>
<script>
require("@/assets/css/flag/flag.css")

import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import { mapState, mapActions } from "vuex"

import currencyJson from '@/assets/static/Currency.json'

const container = {
  state: mapState({
    txn_status: state => state.balances.status,
    summary: state => state.balances.data
  }),
  actions: mapActions({
    query: "balances/query"
  })
}

export default {
  name: "Dashboard",
  data() {
    return {
      loader: false,
      currency_lists : currencyJson,
      amounts: []
    };
  },
  components: {
    PageLoader
  },
  computed: {
    ...container.state
  },
  mounted() {
    this.loader = false
    this.getSummary()
  },
  methods: {
    ...container.actions,
    getSummary() {
      var self = this
      var merchant = JSON.parse(localStorage.getItem("info"))

      self.loader = true

      self.query('balances/merchant/' + merchant.merchant_id).then(() => {
        if (self.txn_status) {
          for (var i in self.summary) {
            self.amounts[self.summary[i].currency] = self.summary[i].amount
          }
          self.loader = false
        }
      }).catch(() => {
        self.loader = false
      })
    }
  }
};
</script>
<style scoped src="./Dashboard.css"></style>
