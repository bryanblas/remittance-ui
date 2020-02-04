<template src="./Withdrawal.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"

import { mapState, mapActions } from "vuex"

const container = {
  state: mapState({
    txn_status: state => state.withdrawals.status,
    withdrawals: state => state.withdrawals.data
  }),
  actions: mapActions({
    query: "withdrawals/query"
  })
}

export default {
  name: "Withdrawal",
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
    this.getWithdrawals()
  },
  methods: {
    ...container.actions,
    getWithdrawals() {
      var self = this
      self.loader = true

      self.query('withdrawals').then(() => {
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
<style scoped src="./Withdrawal.css"></style>
