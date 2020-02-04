<template src="./Deposit.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"

import { mapState, mapActions } from "vuex"

const container = {
  state: mapState({
    txn_status: state => state.deposits.status,
    deposits: state => state.deposits.data
  }),
  actions: mapActions({
    query: "deposits/query"
  })
}

export default {
  name: "Deposit",
  data() {
    return {
      loader: false
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
    this.getDeposits()
  },
  methods: {
    ...container.actions,
    getDeposits() {
      var self = this
      self.loader = true

      self.query('deposits').then(() => {
        if (self.txn_status) {
          self.loader = false
        }
      }).catch(() => {
        self.loader = false
      })
    }
  }
};
</script>
<style scoped src="./Deposit.css"></style>
